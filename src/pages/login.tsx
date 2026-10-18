import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@wholnex/shared';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { ApiError, getErrorMessage } from '@/lib/api';
import { Logo } from '@/components/logo';
import { COMPANY } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Seo } from '@/components/seo';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const from = (location.state as { from?: Location } | null)?.from;
  const redirectTo = from ? `${from.pathname}${from.search}${from.hash}` : '/';

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  async function onSubmit(values: LoginInput) {
    setFormError(null);
    try {
      await login(values);
      toast.success('Welcome back');
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setFormError(getErrorMessage(error, 'Unable to sign in'));
      if (error instanceof ApiError && error.errors) {
        for (const [field, messages] of Object.entries(error.errors)) {
          form.setError(field as keyof LoginInput, { message: messages[0] });
        }
      }
    }
  }

  return (
    <>
      <Seo title="Sign In" description="Sign in to your WHOLNEX account to view your plan requests and messages." path="/login" noIndex />
      <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-4">
            <Link to="/" className="mx-auto block w-fit" aria-label={`${COMPANY.name} home`}>
              <Logo className="justify-center" />
            </Link>
            <div className="space-y-1.5 text-center">
              <h1 className="font-display text-2xl font-semibold leading-none">Sign in</h1>
              <CardDescription>Welcome back. Enter your details to continue.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {formError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input type="email" autoComplete="email" placeholder="jane@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            className="pr-11"
                            {...field}
                          />
                        </FormControl>
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:text-foreground"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Remember me</FormLabel>
                      </FormItem>
                    )}
                  />
                  <Link to="/forgot-password" className="text-sm font-medium text-brand hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Signing in…' : 'Sign in'}
                </Button>
              </form>
            </Form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-medium text-brand hover:underline">
                Create one
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
