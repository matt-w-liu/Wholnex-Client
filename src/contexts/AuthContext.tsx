import { createContext, useCallback, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { LoginInput, RegisterInput } from '@wholnex/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPatch, apiPost, setAuthExpiredHandler } from '@/lib/api';
import {
  clearAuthStorage,
  getAccessToken,
  getRefreshToken,
  getStoredUser,
  setStoredUser,
  setTokens,
} from '@/lib/auth-storage';
import type { User } from '@/lib/types';

interface AuthTokenResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (input: LoginInput) => Promise<User>;
  loginAsync: (input: LoginInput) => Promise<User>;
  register: (input: RegisterInput) => Promise<User>;
  logout: () => Promise<void>;
  updateProfile: (input: { name: string; phone?: string }) => Promise<User>;
  isLoggingIn: boolean;
  isRegistering: boolean;
  isLoggingOut: boolean;
  refetch: () => Promise<unknown>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ME_QUERY_KEY = ['auth', 'me'] as const;

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const meQuery = useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: async () => {
      // Anonymous visitors have no session to validate — skip the request entirely.
      if (!getAccessToken() && !getRefreshToken()) return null;
      try {
        const { user } = await apiGet<{ user: User }>('/auth/me');
        setStoredUser(user);
        return user;
      } catch {
        clearAuthStorage();
        return null;
      }
    },
    // Show the last-known signed-in user immediately (no loading flash on reload)
    // while the query below revalidates it against the server in the background.
    initialData: () => getStoredUser(),
    initialDataUpdatedAt: 0,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  useEffect(() => {
    setAuthExpiredHandler(() => {
      queryClient.setQueryData(ME_QUERY_KEY, null);
    });
    return () => setAuthExpiredHandler(null);
  }, [queryClient]);

  const loginMutation = useMutation({
    mutationFn: (input: LoginInput) => apiPost<AuthTokenResponse>('/auth/login', input),
    onSuccess: ({ user, accessToken, refreshToken }) => {
      setTokens(accessToken, refreshToken);
      setStoredUser(user);
      queryClient.setQueryData(ME_QUERY_KEY, user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (input: RegisterInput) => apiPost<AuthTokenResponse>('/auth/register', input),
    onSuccess: ({ user, accessToken, refreshToken }) => {
      setTokens(accessToken, refreshToken);
      setStoredUser(user);
      queryClient.setQueryData(ME_QUERY_KEY, user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      const refreshToken = getRefreshToken();
      return apiPost<null>('/auth/logout', refreshToken ? { refreshToken } : undefined);
    },
    onSettled: () => {
      clearAuthStorage();
      queryClient.setQueryData(ME_QUERY_KEY, null);
      queryClient.clear();
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (input: { name: string; phone?: string }) =>
      apiPatch<{ user: User }>('/users/me', input),
    onSuccess: ({ user }) => {
      setStoredUser(user);
      queryClient.setQueryData(ME_QUERY_KEY, user);
    },
  });

  const login = useCallback(
    async (input: LoginInput) => (await loginMutation.mutateAsync(input)).user,
    [loginMutation],
  );

  const register = useCallback(
    async (input: RegisterInput) => (await registerMutation.mutateAsync(input)).user,
    [registerMutation],
  );

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  const updateProfile = useCallback(
    async (input: { name: string; phone?: string }) =>
      (await updateProfileMutation.mutateAsync(input)).user,
    [updateProfileMutation],
  );

  const user = meQuery.data ?? null;

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading: meQuery.isLoading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login,
      loginAsync: login,
      register,
      logout,
      updateProfile,
      isLoggingIn: loginMutation.isPending,
      isRegistering: registerMutation.isPending,
      isLoggingOut: logoutMutation.isPending,
      refetch: meQuery.refetch,
    }),
    [
      user,
      meQuery.isLoading,
      meQuery.refetch,
      login,
      register,
      logout,
      updateProfile,
      loginMutation.isPending,
      registerMutation.isPending,
      logoutMutation.isPending,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
