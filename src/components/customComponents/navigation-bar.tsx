import React from "react";
import { Button } from "@/components/ui/button";
import ThemeButton from "./theme-button";

const NavigationBar = () => {
  return (
    <nav className="w-full border-b shadow-sm">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-2">
        <div className="text-xl font-bold text-blue-600">Product QnA System</div>
        <div className="flex gap-4 items-center">
          <Button variant="ghost" asChild>
            <a href="/" className="font-medium">Home</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="/chat" className="font-medium">Chat</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="/#about" className="font-medium">About</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="/contact" className="font-medium">Contact</a>
          </Button>
          <ThemeButton />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;