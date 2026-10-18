import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import { Toaster } from '@/components/ui/sonner';
import { MainLayout } from '@/layouts/main-layout';
import { AdminLayout } from '@/layouts/admin-layout';
import { ProtectedRoute } from '@/components/protected-route';
import { AdminRoute } from '@/components/admin-route';
import { LoadingState } from '@/components/loading-state';

const HomePage = lazy(() => import('@/pages/home'));
const VpnPage = lazy(() => import('@/pages/vpn'));
const DownloadPage = lazy(() => import('@/pages/download'));
const PricingPage = lazy(() => import('@/pages/pricing'));
const QuotePage = lazy(() => import('@/pages/quote'));
const NetworkPage = lazy(() => import('@/pages/network'));
const SolutionsPage = lazy(() => import('@/pages/solutions'));
const SecurityPage = lazy(() => import('@/pages/security'));
const AboutPage = lazy(() => import('@/pages/about'));
const ContactPage = lazy(() => import('@/pages/contact'));
const FaqPage = lazy(() => import('@/pages/faq'));
const LoginPage = lazy(() => import('@/pages/login'));
const RegisterPage = lazy(() => import('@/pages/register'));
const ForgotPasswordPage = lazy(() => import('@/pages/forgot-password'));
const ResetPasswordPage = lazy(() => import('@/pages/reset-password'));
const AccountPage = lazy(() => import('@/pages/account'));
const PrivacyPage = lazy(() => import('@/pages/privacy'));
const TermsPage = lazy(() => import('@/pages/terms'));
const AcceptableUsePage = lazy(() => import('@/pages/acceptable-use'));
const RefundPolicyPage = lazy(() => import('@/pages/refund-policy'));
const CookiesPage = lazy(() => import('@/pages/cookies'));
const AccessibilityPage = lazy(() => import('@/pages/accessibility'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));
const UnauthorizedPage = lazy(() => import('@/pages/unauthorized'));

const AdminDashboardPage = lazy(() => import('@/pages/admin/admin-dashboard'));
const AdminQuoteRequestsPage = lazy(() => import('@/pages/admin/admin-quote-requests'));
const AdminContactPage = lazy(() => import('@/pages/admin/admin-contact'));
const AdminUsersPage = lazy(() => import('@/pages/admin/admin-users'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function PageFallback() {
  return <LoadingState fullPage />;
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="vpn" element={<VpnPage />} />
          <Route path="download" element={<DownloadPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="quote" element={<QuotePage />} />
          <Route path="network" element={<NetworkPage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="acceptable-use" element={<AcceptableUsePage />} />
          <Route path="refund-policy" element={<RefundPolicyPage />} />
          <Route path="cookies" element={<CookiesPage />} />
          <Route path="accessibility" element={<AccessibilityPage />} />
          <Route path="unauthorized" element={<UnauthorizedPage />} />

          {/* Legacy routes from previous site builds */}
          <Route path="website-terms" element={<Navigate to="/terms" replace />} />
          <Route path="vps-hosting" element={<Navigate to="/vpn" replace />} />
          <Route path="infrastructure" element={<Navigate to="/network" replace />} />

          <Route element={<ProtectedRoute />}>
            <Route path="account" element={<AccountPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="quote-requests" element={<AdminQuoteRequestsPage />} />
            <Route path="contact" element={<AdminContactPage />} />
            <Route path="users" element={<AdminUsersPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <CookieConsentProvider>
            <BrowserRouter>
              <AuthProvider>
                <AppRoutes />
                <Toaster />
              </AuthProvider>
            </BrowserRouter>
          </CookieConsentProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
