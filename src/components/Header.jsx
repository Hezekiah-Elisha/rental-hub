"use client";
import DarkModeSwitch from "./DarkModeSwitch";
import Link from "next/link";
import Image from "next/image";
import { hasCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { deleteAllCookies } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(hasCookie("access_token"));

  useEffect(() => {
    setLoggedIn(hasCookie("access_token"));
  }, [loggedIn]);

  const handleLogout = () => {
    deleteAllCookies();
    // router.push("/signin");
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
          <Link href={"/signin"} onClick={handleLogout} className="cursor-pointer text-red-600">
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
