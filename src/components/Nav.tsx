import React from "react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { GiHamburgerMenu } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";

import { ModeToggle } from "./theme-toggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import DropMenu from "./DropMenu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


const NavBar = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <nav className="flex h-16 bg-background/50 sticky top-0 border-b px-8 backdrop-blur items-center justify-between z-20">
        <Image src="/images/logo.png" height={45} width={45} alt="logo" />

        <ul className="hidden md:flex w-full justify-end space-x-4 items-center">
          <li className="space-x-2">
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline" })}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={buttonVariants({ variant: "outline" })}
            >
              Signup
            </Link>
          </li>

          <ModeToggle />
        </ul>
      </nav>
    )
  } else {
    return (
      <nav className="flex h-16 bg-background/50 sticky top-0 border-b px-8 backdrop-blur items-center justify-between z-20">
        <Link href="/">
          <Image src="/images/logo.png" height={45} width={45} alt="logo" />
        </Link>

        <div className="flex items-center space-x-4 md:hidden">
          {/* Hamburger Menu for Mobile View */}
          <Sheet>
            <SheetTrigger>
              <RxHamburgerMenu className="text-2xl md:hidden" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-3xl underline">MENU</SheetTitle>
                <nav>
                  <ul className="flex flex-col p-2">
                    <li>  
                      <Link
                        href="/blog"
                        className="text-2xl font-light mt-[20px]"
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/create-post"
                        className="text-2xl font-light mt-[20px]"
                      >
                        Create post
                      </Link>
                    </li>
                    <li>
                      <DropMenu />
                    </li>
                  </ul>
                </nav>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <ModeToggle />
        </div>

        <ul className="hidden md:flex w-full justify-end space-x-4 items-center">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/blog"}>Blog</Link>
          </li>
          <li>
            <Link
              href="/create-post"
              className={buttonVariants({ variant: "default" })}
            >
              Create post
            </Link>
          </li>
          <DropMenu />
        </ul>
      </nav>
    );
  }
};

export default NavBar;
