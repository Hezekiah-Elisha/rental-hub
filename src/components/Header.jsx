"use client";
import React, { useState } from "react";
import DarkModeSwitch from "./DarkModeSwitch";
import Link from "next/link";
import Image from "next/image";
import authServiceInstance from "@/utils/AuthService";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await authServiceInstance.logout();
    router.push("/");
  };


  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  return (
    <div className="flex flex-row justify-between align-middle items-center p-5 bg-blue-100 bg-opacity-50 dark:bg-blue-900 dark:bg-opacity-50 backdrop-blur-3xl">
      <Link href={"/"}>
        <h1 className="text-3xl">Rental Hub</h1>
      </Link>
      <div className="flex flex-row align-middle justify-center items-center gap-4">
        <DarkModeSwitch />
        <Link href="/signin">Sign In</Link>
        <Link href="/signup">Sign Up</Link>
        <Link href="/dashboard">Dashboard</Link>
        <div onClick={togglePopover}>
          <Image
            src="/im.jpg"
            alt="logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        {isPopoverOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg z-10">
            <div className="flex flex-col">
              <Link href="/profile">
                <Link href="/profile"
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                  onClick={closePopover}
                >
                  Profile
                </Link>
              </Link>
              <Link href="/settings">
                <Link href="/settings"
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                  onClick={closePopover}
                >
                  Settings
                </Link>
              </Link>
              <Link href="/logout">
                <Link href="/logout"
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
