import React from "react";
import DarkModeSwitch from "./DarkModeSwitch";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-row justify-between align-middle items-center p-5 bg-blue-100 dark:bg-blue-900">
      <div>
        <h1 className="text-3xl">Rental Hub</h1>
      </div>
      <div className="flex flex-row align-middle justify-center items-center gap-4">
        <DarkModeSwitch />
        <Link href="/signin">
            Sign In
        </Link>
        <Link href="/signup">
            Sign Up
        </Link>
        <Link href="/dashboard">
            Dashboard
        </Link>
      </div>
    </div>
  );
}
