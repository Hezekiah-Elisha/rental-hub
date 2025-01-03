"use client";
import { useEffect, useState } from "react";
import DarkModeSwitch from "./DarkModeSwitch";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Popover } from "react-tiny-popover";
import  { logout } from "@/app/actions/auth";
import { getSession, hasSession } from "@/app/lib/session";

export default function Header() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(getSession() || hasSession());

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setIsAuthenticated(true);
        console.log(session);
      }else{
        setIsAuthenticated(false);
        router.push("/signin");

      }
    });
    hasSession().then((session) => {
      if (session) {
        setIsAuthenticated(true);
        console.log(session);
      } else {
        setIsAuthenticated(false);
        router.push("/signin");
      }
    });
  }, []);

  const handleMouseEnter = () => setIsPopoverOpen(true);
  const handleMouseLeave = () => setIsPopoverOpen(false);

  const handleLogout = () => {
    // Perform logout logic here
    // For example, remove tokens from cookies/localStorage
    // Then redirect to the login page

    logout().then(() => {
      setIsAuthenticated(false);
      router.push("/signin");
    }).catch((error) => {
      console.error("Logout error:", error);
    });
  };

  return (
    <div className="flex flex-row justify-between align-middle items-center p-5 dark:bg-opacity-50 backdrop-blur-3xl">
      <Link href="/">
        <h1 className="text-3xl">Rental Hub</h1>
      </Link>
      <div className="flex flex-row align-middle justify-center items-center gap-4">
        <DarkModeSwitch />
        {isAuthenticated ? (
          <div className="flex flex-row gap-4 justify-center align-middle items-center">
            <button onClick={handleLogout} className="text-red-500">
              Logout
            </button>
            <Link href="/dashboard">Dashboard</Link>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <Popover
                isOpen={isPopoverOpen}
                positions={["bottom"]}
                content={
                  <ul className="flex flex-col gap-4 bg-zinc-200 rounded-lg p-4">
                    <li className="p-4">Profile</li>
                    <li className="p-4">Settings</li>
                    <li className="p-4" onClick={handleLogout}>
                      Logout
                    </li>
                  </ul>
                }
              >
                <p className="cursor-pointer">Account</p>
              </Popover>
            </div>
          </div>
        ) : (
          <Link href="/signin">Sign In</Link>
        )}
      </div>
    </div>
  );
}
