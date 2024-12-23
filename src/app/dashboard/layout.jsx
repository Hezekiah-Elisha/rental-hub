"use client";
import SideNav from "@/components/SideNav";
import React from "react";
import { isLoggedIn } from "../actions/auth";
import { redirect } from "next/navigation";
import Breadcrumbs from "@/components/Breadcumbs";

export default function layout({ children }) {
  if (!isLoggedIn()) {
    redirect("/signin");
  }

  return (
    <div className="flex flex-row">
      <SideNav />
      <div className="p-5 w-full">
        <Breadcrumbs />
        {children}
      </div>
    </div>
  );
}
