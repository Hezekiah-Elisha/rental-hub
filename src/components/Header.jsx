"use client";
import DarkModeSwitch from "./DarkModeSwitch";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "./ui/button";
import { deleteAllCookies } from "@/app/lib/session";
import { useRouter } from "next/navigation"; // Use useRouter instead of redirect
import { useEffect } from "react";

export default function Header() {
  const { access_token, refreshToken, logout } = useAuth();
  const router = useRouter(); // For programmatic navigation

  useEffect(() => {
    refreshToken();
  }, []);

  const handleLogout = () => {
    deleteAllCookies();
    router.push("/signin"); // Use router.push instead of redirect
    logout();
  };

  return (
    <div className="flex flex-row justify-between align-middle items-center p-5 dark:bg-opacity-50 backdrop-blur-3xl">
      <Link href="/">
        <h1 className="text-3xl">Rental Hub</h1>
      </Link>
      <div className="flex flex-row align-middle justify-center items-center gap-4">
        <DarkModeSwitch />
        {access_token ? ( // Simply use access_token to toggle UI
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="cursor-pointer text-red-600"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Link href="/signin">Sign In</Link>
        )}
      </div>
    </div>
  );

  // if (loggedIn) {
  //   return (
  //     <div className="flex flex-row justify-between align-middle items-center p-5 dark:bg-opacity-50 backdrop-blur-3xl">
  //       <Link href="/">
  //         <h1 className="text-3xl">Rental Hub</h1>
  //       </Link>
  //       <div className="flex flex-row align-middle justify-center items-center gap-4">
  //         <DarkModeSwitch />
  //         <Link href="/dashboard">Dashbaord</Link>
  //         <Link
  //           href={""}
  //           onClick={handleLogout}
  //           className="cursor-pointer text-red-600"
  //         >
  //           Sign Out
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }
  // return (
  //   <div className="flex flex-row justify-between align-middle items-center p-5 dark:bg-opacity-50 backdrop-blur-3xl">
  //     <Link href="/">
  //       <h1 className="text-3xl">Rental Hub</h1>
  //     </Link>
  //     <div className="flex flex-row align-middle justify-center items-center gap-4">
  //       <DarkModeSwitch />
  //       <Link href="/signin">Sign In</Link>
  //     </div>
  //   </div>
  // );
}
