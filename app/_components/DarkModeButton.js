"use client"; // Required for client-side interactivity
import { SunIcon } from "@heroicons/react/24/solid";
import { MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
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
/*const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    // Check user's preferred theme
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);
  useEffect(() => {
    // Apply dark mode class to HTML element
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [darkMode]);
  return (
    <button onClick={() => setDarkMode(!darkMode)} className="cursor-pointer">
      {darkMode ? (
        <SunIcon className="size-7" />
      ) : (
        <MoonIcon className="size-7" />
      )}
    </button>
  );*/
