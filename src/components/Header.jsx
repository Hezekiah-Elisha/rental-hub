"use client";
import DarkModeSwitch from "./DarkModeSwitch";
import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { deleteAllCookies, hasCookie } from "@/app/lib/session";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await hasCookie("access_token");
      setLoggedIn(loggedIn);
    };
    checkLogin();
  }, []);

  const handleLogout = () => {
    deleteAllCookies();
    // window.location.href = "/signin";
    redirect("/signin");
  };

  if (loggedIn) {
    return (
      <div className="flex flex-row justify-between align-middle items-center p-5 dark:bg-opacity-50 backdrop-blur-3xl">
        <Link href="/">
          <h1 className="text-3xl">Rental Hub</h1>
        </Link>
        <div className="flex flex-row align-middle justify-center items-center gap-4">
          <DarkModeSwitch />
          <Link href="/dashboard">Dashbaord</Link>
          <Link
            href={""}
            onClick={handleLogout}
            className="cursor-pointer text-red-600"
          >
            Sign Out
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row justify-between align-middle items-center p-5 dark:bg-opacity-50 backdrop-blur-3xl">
      <Link href="/">
        <h1 className="text-3xl">Rental Hub</h1>
      </Link>
      <div className="flex flex-row align-middle justify-center items-center gap-4">
        <DarkModeSwitch />
        <Link href="/signin">Sign In</Link>
      </div>
    </div>
  );
}
