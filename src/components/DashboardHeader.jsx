import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./ui/menubar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { deleteAllCookies } from "@/app/lib/session";
import { ModeToggle } from "./ModeToggle";

export default function DashboardHeader() {
  const { access_token, logout } = useAuth(); // Use logout from context
  const router = useRouter();
  const handleLogout = () => {
    deleteAllCookies(); // Your existing cookie clear
    logout(); // Sync context
    router.push("/signin");
  };
  return (
    <>
      <div className="flex flex-row justify-between p-2 w-full">
        <div className="text-2xl font-bold text-primary">
          Rental Hub <span className="text-secondary">Dashboard</span>
        </div>
        <div className="flex flex-row align-middle justify-center items-center gap-4">

        <ModeToggle />
        <Menubar>

          <MenubarMenu>
            <MenubarTrigger>Profile</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={handleLogout}>Logout</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        </div>
      </div>
    </>
  );
}
