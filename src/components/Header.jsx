"use client";
import { useState } from "react";
import DarkModeSwitch from "./DarkModeSwitch";
import Link from "next/link";
import Image from "next/image";
import authServiceInstance from "@/utils/AuthService";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/app/actions/auth";
import { Popover } from "react-tiny-popover";

export default function Header() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());

  const handleMouseEnter = () => setIsPopoverOpen(true);
  const handleMouseLeave = () => setIsPopoverOpen(false);

  const handleLogout = async () => {
    try {
      await authServiceInstance.logout();
      router.push("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-row justify-between align-middle items-center p-5 dark:bg-opacity-50 backdrop-blur-3xl">
      <Link href={"/"}>
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
            <div>
              <Popover
                isOpen={isPopoverOpen}
                positions={["bottom"]}
                content={
                  <ul className="flex flex-col gap-4 bg-zinc-200 rounded-lg p-4">
                    <li className="p-4">Profile</li>
                    <li className="p-4">Settings</li>
                    <li className="p-4">Logout</li>
                  </ul>
                }
              >
                <Image
                  src="/im.jpg"
                  alt="logo"
                  width={50}
                  height={50}
                  className="rounded-full"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </Popover>
            </div>
          </div>
        ) : (
          <div>
            <Link href="/signin">Sign In</Link>
            <Link href="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  );
}
