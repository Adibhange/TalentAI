"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  ChevronDown,
  LayoutDashboardIcon,
  LogInIcon,
  SparklesIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import GrowthTools from "@/data/growthTools";

const Header = () => {
  return (
    <header className="bg-background/80 fixed top-0 z-50 w-full backdrop-blur-md">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/">
          <Image
            src={"/Logo.png"}
            alt="Logo"
            width={200}
            height={60}
            className="h-10 w-auto object-contain py-1"
          />
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline">
                <LayoutDashboardIcon className="h-4 w-4"></LayoutDashboardIcon>
                <span className="hidden md:block">Industry Trends</span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <SparklesIcon className="h-4 w-4"></SparklesIcon>
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4"></ChevronDown>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {GrowthTools.map((tool) => (
                  <DropdownMenuItem key={tool.name}>
                    <Link href={tool.href} className="flex items-center gap-2">
                      <tool.icon className="h-4 w-4"></tool.icon>
                      <span>{tool.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="secondary">
                <LogInIcon className="h-4 w-4"></LogInIcon>
                <span>Sign In</span>
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "!h-10 !w-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
