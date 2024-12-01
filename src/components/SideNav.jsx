import { ChartBarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

export default function SideNav() {
  return (
    <div className="h-screen flex flex-col justify-between text-black dark:text-white">
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-start align-middle items-center gap-4 hover:bg-slate-500 rounded-full px-7 py-4">
            <ChartBarIcon className="w-6 h-6" />
            <Link href="/dashboard" className="">
              Dashboard
            </Link>
          </div>
          <div className="flex flex-row justify-start align-middle items-center gap-4 hover:bg-slate-500 rounded-full px-7 py-4">
            <ChartBarIcon className="w-6 h-6" />
            <Link href="/dashboard/profile" className="">
              Profile
            </Link>
          </div>
          <div className="flex flex-row justify-start align-middle items-center gap-4 hover:bg-slate-500 rounded-full px-7 py-4">
            <ChartBarIcon className="w-6 h-6" />
            <Link href="/dashboard/rentals" className="">
              Rentals
            </Link>
          </div>
          <div className="flex flex-row justify-start align-middle items-center gap-4 hover:bg-slate-500 rounded-full px-7 py-4">
            <ChartBarIcon className="w-6 h-6" />
            <Link href="/dashboard/bookings" className="">
              Bookings
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between align-middle p-5 rounded-3xl bg-slate-400 w-full">
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
