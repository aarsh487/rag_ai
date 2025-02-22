"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div>home
    <button
      onClick={() => setTheme("light")}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800"
    >
    </button>
    <button
      onClick={() => setTheme("dark")}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800"
    >
    </button>
    </div>
  );
}
