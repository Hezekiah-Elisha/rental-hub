"use client";
import React from "react";
import Breadcrumbs from "@/components/Breadcumbs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Separator } from "@/components/ui/separator";

export default function layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <DashboardHeader />
        <div className="flex flex-row justify-start align-middle items-center gap-20">
          <SidebarTrigger />
          <Breadcrumbs />
        </div>
        <div className="p-10 w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
}

// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"

// export default function Layout({ children }) {
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <main>
//         <SidebarTrigger />
//         {children}
//       </main>
//     </SidebarProvider>
//   )
// }
