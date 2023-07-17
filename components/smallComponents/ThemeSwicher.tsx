"use client";

import React, { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import useToggle from "@/hooks/useToggle";

export function ModeToggle() {
  const { setTheme } = useTheme();

  const { toggle, toggleValue } = useToggle(["dark", "light"]);

  useEffect(() => {
    setTheme(toggleValue);
  }, [toggleValue, setTheme]);

  return (
    <Button variant="outline" size="icon" onClick={() => toggle()}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );

  //   return (
  //     <DropdownMenu>
  //       <DropdownMenuTrigger asChild>
  //         <Button variant="outline" size="icon">
  //           <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  //           <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  //           <span className="sr-only">Toggle theme</span>
  //         </Button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent align="end">
  //         <DropdownMenuItem onClick={() => setTheme("light")}>
  //           Light
  //         </DropdownMenuItem>
  //         <DropdownMenuItem onClick={() => setTheme("dark")}>
  //           Dark
  //         </DropdownMenuItem>
  //         <DropdownMenuItem onClick={() => setTheme("system")}>
  //           System
  //         </DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   );
}
