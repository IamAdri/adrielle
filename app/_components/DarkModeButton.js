"use client";
import { SunIcon } from "@heroicons/react/24/solid";
import { MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // Wait until client render is finished to avoid hydration mismatch
    setIsMounted(true);
  }, []);
  if (!isMounted) return;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer"
    >
      {theme === "dark" ? (
        <SunIcon className="size-7" />
      ) : (
        <MoonIcon className="size-7" />
      )}
    </button>
  );
}
