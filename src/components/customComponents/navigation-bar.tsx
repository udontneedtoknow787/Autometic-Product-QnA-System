import React from "react";
import { Button } from "@/components/ui/button";
import ThemeButton from "./theme-button";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <nav className="w-full border-b shadow-sm">
      <div className="mx-auto flex flex-col gap-0 sm:flex-row items-center justify-between px-4 py-3 ">
        <div className="text-xl font-bold text-blue-600">Product Q&A System</div>
        <div className="flex gap-4 items-center">
          <Button variant="ghost" asChild>
            <Link href="/" className="font-medium">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/chat" className="font-medium">Chat</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#sample" className="font-medium">Demo</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#about" className="font-medium">About</Link>
          </Button>
          <ThemeButton />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;