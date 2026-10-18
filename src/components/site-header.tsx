import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { COMPANY, PRIMARY_NAV, RESOURCES_NAV } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { MobileNavigation } from '@/components/mobile-navigation';
import { initials } from '@/lib/utils';
import { RESOURCE_ICONS } from '@/lib/navigation-icons';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
    'after:absolute after:inset-x-2.5 after:-bottom-[13px] after:h-0.5 after:rounded-full after:bg-transparent after:transition-colors',
    isActive && 'text-foreground after:bg-gradient-to-r after:from-primary after:to-cyan-500',
  );

export function SiteHeader() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const resourcesActive = pathname === '/faq' || pathname === '/security';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b transition-all duration-300',
        scrolled
          ? 'border-border bg-background/85 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/70'
          : 'border-transparent bg-background/60 backdrop-blur-md',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center rounded-md" aria-label={`${COMPANY.name} home`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {PRIMARY_NAV.slice(0, 5).map((link) => (
            <NavLink key={link.href} to={link.href} end={link.href === '/'} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    'h-auto bg-transparent px-2.5 py-2 text-sm font-medium text-muted-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-foreground',
                    resourcesActive && 'text-foreground',
                  )}
                >
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[340px] gap-1 p-2">
                    {RESOURCES_NAV.map((resource) => {
                      const Icon = RESOURCE_ICONS[resource.href];
                      return (
                        <li key={resource.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={resource.href}
                              className="flex items-start gap-3 rounded-lg p-3 outline-none transition-colors hover:bg-accent focus:bg-accent"
                            >
                              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                                {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                              </span>
                              <span className="space-y-1">
                                <span className="block text-sm font-semibold leading-none">{resource.label}</span>
                                {resource.description && (
                                  <span className="block text-xs leading-snug text-muted-foreground">{resource.description}</span>
                                )}
                              </span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {PRIMARY_NAV.slice(5).map((link) => (
            <NavLink key={link.href} to={link.href} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2" aria-label="Account menu">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-brand/15 text-xs font-semibold text-brand">{initials(user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account" className="gap-2">
                    <UserIcon className="h-4 w-4" /> My account
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="gap-2">
                      <LayoutDashboard className="h-4 w-4" /> Admin dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="gap-2 text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" className="hidden xl:inline-flex" asChild>
              <Link to="/login">Sign in</Link>
            </Button>
          )}

          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/pricing">View VPS Plans</Link>
          </Button>

          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
