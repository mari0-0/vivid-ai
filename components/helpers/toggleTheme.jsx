"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted

  // Use useEffect to ensure the theme is set only after the component mounts
  useEffect(() => {
    setIsMounted(true); // Set to true after the component mounts
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  if (!isMounted) return null; // Return null until the component has mounted

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {/* Sun Icon (light mode) */}
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          resolvedTheme === "dark" ? "rotate-0 scale-0" : "rotate-0 scale-100"
        }`}
      />
      {/* Moon Icon (dark mode) */}
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
          resolvedTheme === "light" ? "rotate-90 scale-0" : "rotate-0 scale-100"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
