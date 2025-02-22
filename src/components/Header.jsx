"use client";
import DarkModeSwitch from "./DarkModeSwitch";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "./ui/button";
import { deleteAllCookies } from "@/app/lib/session";
import { useRouter } from "next/navigation";

export default function Header() {
  const { access_token, logout } = useAuth(); // Use logout from context
  const router = useRouter();

  const handleLogout = () => {
    deleteAllCookies(); // Your existing cookie clear
    logout(); // Sync context
    router.push("/signin");
  };

  return (
    <div className="flex flex-row justify-between align-middle items-center p-5 dark:bg-opacity-50 backdrop-blur-3xl">
      <Link href="/">
        <h1 className="text-3xl">Rental Hub</h1>
      </Link>
      <div className="flex flex-row align-middle justify-center items-center gap-4">
        <DarkModeSwitch />
        {access_token ? (
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
}