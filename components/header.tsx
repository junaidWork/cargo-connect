"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Truck } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <Truck className="h-6 w-6" />
            <h1 className="text-xl font-bold">Cargo Connect</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="font-medium">
            Home
          </Link>
          <Link href="/tracking" className="font-medium">
            Track
          </Link>
          <Link href="/booking" className="font-medium">
            Book
          </Link>
          <Link href="/calendar" className="font-medium">
            Calendar
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="outline" size="sm">
            Login
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pt-10">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="font-medium text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/tracking"
                  className="font-medium text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Track
                </Link>
                <Link
                  href="/booking"
                  className="font-medium text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Book
                </Link>
                <Link
                  href="/calendar"
                  className="font-medium text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Calendar
                </Link>
                <div className="pt-4">
                  <Button className="w-full">Login</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
