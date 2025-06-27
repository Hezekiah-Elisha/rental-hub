import React, { useEffect, useState } from "react";
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
import { deleteAllCookies, getCookie } from "@/app/lib/session";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import { Button } from "./ui/button";

export default function DashboardHeader() {
  const [user, setUser] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const { access_token, logout } = useAuth(); // Use logout from context
  const router = useRouter();
  const handleLogout = () => {
    deleteAllCookies(); // Your existing cookie clear
    logout(); // Sync context
    router.push("/signin");
  };

  useEffect(() => {
    getCookie("photoURL").then((url) => {
      if (url) {
        setPhotoUrl(url.value);
        // console.log("Photo URL from cookie:", url);
      }
    });
  }, []);

  useEffect(() => {
    getCookie("user")
      .then((user) => {
        if (user) {
          setUser(JSON.parse(user.value));
          // console.log("User from cookie:", user);
        }
      })
      .catch((error) => {
        console.error("Error fetching user cookie:", error);
      });
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between p-2 w-full">
        <div className="text-2xl font-bold text-primary">
          Rental Hub Ke{" "}
          <span className="text-secondary-foreground">Dashboard</span>
        </div>
        <div className="flex flex-row align-middle justify-center items-center gap-4">
          <ModeToggle />
          <Menubar className="w-full">
            <MenubarMenu>
              <MenubarTrigger>
                <div className="w-full flex flex-row items-center gap-2">
                  <div className="relative w-8 h-8">
                    <Image
                      src={photoUrl || "/default-avatar.png"}
                      alt="User Avatar"
                      fill
                      className="rounded-full object-cover"
                      sizes="32px"
                    />
                  </div>
                  <span>Hi {user?.name}</span>
                </div>
              </MenubarTrigger>
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
              <span onClick={handleLogout} className="text-sm hover:cursor-pointer hover:bg-red-500 p-2 rounded">Logout</span>

              {/* <MenubarTrigger>Edit</MenubarTrigger>
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
              </MenubarContent> */}
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </>
  );
}
