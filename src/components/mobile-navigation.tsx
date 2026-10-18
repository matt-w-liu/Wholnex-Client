import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, LogOut, Menu, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRIMARY_NAV, RESOURCES_NAV } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';
import { RESOURCE_ICONS } from '@/lib/navigation-icons';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-accent',
    isActive && 'bg-accent text-accent-foreground',
  );

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col overflow-y-auto sm:max-w-sm">
        <SheetHeader className="text-left">
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </SheetHeader>

        <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile primary">
          {PRIMARY_NAV.map((link) => (
            <NavLink key={link.href} to={link.href} end={link.href === '/'} onClick={close} className={linkClass}>
              {link.label}
            </NavLink>
          ))}

          <p className="mt-4 px-3 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">Resources</p>
          {RESOURCES_NAV.map((resource) => {
            const Icon = RESOURCE_ICONS[resource.href];
            return (
              <Link key={resource.href} to={resource.href} onClick={close} className={linkClass({ isActive: false })}>
                {Icon && <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
                {resource.label}
              </Link>
            );
          })}
        </nav>

        <Button className="mt-6 w-full" asChild onClick={close}>
          <Link to="/pricing">View VPS Plans</Link>
        </Button>

        <Separator className="my-5" />

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>

        <Separator className="my-5" />

        {isAuthenticated && user ? (
          <div className="space-y-2">
            <p className="truncate text-sm text-muted-foreground">Signed in as {user.email}</p>
            <Button variant="outline" className="w-full justify-start gap-2" asChild onClick={close}>
              <Link to="/account">
                <UserIcon className="h-4 w-4" /> My account
              </Link>
            </Button>
            {isAdmin && (
              <Button variant="outline" className="w-full justify-start gap-2" asChild onClick={close}>
                <Link to="/admin">
                  <LayoutDashboard className="h-4 w-4" /> Admin dashboard
                </Link>
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-destructive"
              onClick={() => {
                close();
                logout();
              }}
            >
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" asChild onClick={close}>
              <Link to="/login">Sign in</Link>
            </Button>
            <Button variant="secondary" asChild onClick={close}>
              <Link to="/register">Create account</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
