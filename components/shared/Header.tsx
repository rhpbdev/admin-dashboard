import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import DarkModeToggle from './DarkModeToggle';
// import LogOutButton from './LogOutButton';
// import { getUser } from '@/auth/server';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport
} from '@/components/ui/navigation-menu';

async function Header() {
  // const user = await getUser();
  return (
    <header className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-8">
      <div className="w-1/3">
        <Link href="/" className="flex items-end gap-2">
          <Image
            src="/cfmemories-logo-black.png"
            width={200}
            height={70}
            alt="logo"
            className="rounded-full"
            priority
          />
          {/* <h1 className="flex flex-col pb-1 text-2xl leading-6 font-bold">
							  CF <span>Memories</span>
							</h1> */}
        </Link>
      </div>

      {/* <div className='w-1/3'>
				<ul className='flex items-center justify-center space-x-8 font-semibold'>
					<Link
						href='/sample'
						className='transition duration-300 ease-in-out hover:scale-108 hover:text-yellow-600'>
						<li>Home</li>
					</Link>
					<Link
						href='/'
						className='transition duration-300 ease-in-out hover:scale-108 hover:text-yellow-600'>
						<li>Programs</li>
					</Link>
					<Link
						href='/'
						className='transition duration-300 ease-in-out hover:scale-108 hover:text-yellow-600'>
						<li>About</li>
					</Link>
					<Link
						href='/'
						className='transition duration-300 ease-in-out hover:scale-108 hover:text-yellow-600'>
						<li>Cart</li>
					</Link>
					<Link
						href='/'
						className='transition duration-300 ease-in-out hover:scale-108 hover:text-yellow-600'>
						<li>Checkout</li>
					</Link>
				</ul>
			</div> */}

      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/programs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Programs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex gap-4 w-1/3 justify-end">
        {/* {user ? (
					<p>Log Out</p>
				) : (
					<>
						<Button asChild className='hidden sm:block'>
							<Link href='/login'>Sign Up</Link>
						</Button>
						<Button asChild variant='outline'>
							<Link href='/login'>Login</Link>
						</Button>
					</>
				)} */}
        <Button asChild className="hidden sm:block">
          <Link href="/">Sign Up</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Login</Link>
        </Button>
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;
