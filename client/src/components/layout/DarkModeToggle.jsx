import { memo, useEffect, useState } from "react";

import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

const getTheme = () => {
  if (localStorage.theme === "dark") {
    return true;
  }

  if (localStorage.theme === "light") {
    return false;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(getTheme);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", darkMode);

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <button
      type="button"
      aria-label="Toggle Theme"
      onClick={toggleTheme}
      className={cn(
        "relative flex h-7 w-13 items-center rounded-full border px-1 transition-colors duration-300",
        darkMode ? "bg-zinc-800" : "bg-zinc-200",
      )}
    >
      <span
        className={cn(
          "absolute flex h-5 w-5 items-center justify-center rounded-full shadow-md transition-transform duration-300",
          darkMode ? "translate-x-5 bg-black" : "translate-x-0 bg-white",
        )}
      >
        {darkMode ? (
          <Moon className="h-4 w-4 text-white" />
        ) : (
          <Sun className="h-4 w-4 text-yellow-500" />
        )}
      </span>
    </button>
  );
};

export default memo(DarkModeToggle);
