import React from 'react';
import UserComponent from '../ui/user';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import ModeToggle from '@/components/theme-switch';
import SearchComponent from './search';
import RoleBadge from '@/components/dashboard/role-badge';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import type { UserType } from '@/type';

const NavBarData = {
  brand: {
    name: 'DOST SA USC',
    logo: '/logo.png',
    alt: 'DOST SA USC Logo',
    fallback: 'DSU',
    href: '/dashboard',
  },
  menu: [
    { title: 'Home', href: '/dashboard' },
    {
      title: 'Announcements',
      href: '/dashboard/announcements',
    },
    {
      title: 'Events & Activities',
      href: '/dashboard/calendar',
    },
  ],
  resources: {
    title: 'Resources',
    items: [
      {
        title: 'JLSS Application Guide',
        href: '#',
        description: 'magna incididunt minim occaecat adipisicing',
      },
      {
        title: 'Set Up iAccess',
        href: '#',
        description: 'magna incididunt minim occaecat adipisicing',
      },
      {
        title: 'Travel Clearance Guide',
        href: '#',
        description: 'magna incididunt minim occaecat adipisicing',
      },
    ],
  },
};

const NavBar = (props: { user: UserType }) => {
  return (
    <div className="fixed top-0 left-0 z-50 flex w-full items-center justify-center">
      <div className="flex min-h-10 w-full max-w-[1600px] items-center justify-between p-2 px-4 backdrop-blur-xs md:p-4 md:px-16 lg:px-20">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link
            href={NavBarData.brand.href}
            className="flex items-center gap-2"
          >
            <Avatar className="size-10 rounded-lg">
              <Image
                src={NavBarData.brand.logo}
                width="180"
                height="180"
                alt={NavBarData.brand.alt}
              />
              <AvatarFallback className="bg-accent rounded-lg">
                {NavBarData.brand.fallback}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="hidden md:block">
            <h1 className="text-xl leading-4 font-bold">DOST SA USC</h1>
            <p className="text-muted-foreground text-sm">Scholar Portal</p>
          </div>
        </div>
        {/* Nav Menu */}
        <NavigationMenu viewport={false} className="hidden lg:block">
          <NavigationMenuList>
            {NavBarData.menu.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild>
                  <Link href={item.href}>{item.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                {NavBarData.resources.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] grid-cols-1 gap-2">
                  {NavBarData.resources.items.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <RoleBadge role={props.user.role} />
          <ModeToggle variant="outline" />
          <SearchComponent data={NavBarData} />
          <UserComponent
            user={{
              name: `${props.user.firstName} ${props.user.lastName}`,
              email: props.user.uscID,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
