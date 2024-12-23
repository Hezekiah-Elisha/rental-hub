import { ChartBarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import SideNavItem from "./SideNavItem";

export default function SideNav() {
  // <li className={router.asPath == "/#about" ? "active" : ""}>
  return (
    <div className="h-screen flex flex-col justify-between text-black dark:text-white backdrop:blur-3xl p-2">
      <div className="space-y-4 rounded-full bg-blue-900/25 text-white dark:text-white">
        <div className="flex flex-col gap-4">
          <SideNavItem
            destination="/dashboard"
            popoverName="Dashboard Home"
            icon={<ChartBarIcon className="w-6 h-6" />}
          />
          {/* <Link
            href="/dashboard/profile"
            className="flex flex-row justify-start align-middle items-center gap-4 hover:bg-slate-500 rounded-full px-7 py-4"
          >
            <ChartBarIcon className="w-6 h-6" />
          </Link> */}
          <SideNavItem
            destination="/dashboard/profile"
            popoverName="Profile"
            icon={<ChartBarIcon className="w-6 h-6" />}
          />
          <SideNavItem
            destination="/dashboard/notes"
            popoverName="Notes"
            icon={<ChartBarIcon className="w-6 h-6" />}
          />
        </div>
      </div>
      <div className="flex flex-col rounded-full bg-blue-900/25 w-full">
        <Link href="/dashboard/settings" className="">
          Settings
        </Link>
        <Link href="/logout" className="">
          Logout
        </Link>
      </div>
    </div>
  );
}
