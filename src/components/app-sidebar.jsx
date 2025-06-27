import { getCookie } from "@/app/lib/session";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  HomeIcon,
  TagIcon,
  CalendarIcon,
  SearchIcon,
  SettingsIcon,
  GaugeIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function AppSidebar() {
  const [items, setItems] = useState([]);

  const normalUserItems = [
    {
      title: "Dashboard Page",
      url: "/dashboard",
      icon: GaugeIcon,
    },
    {
      title: "Houses",
      url: "/dashboard/properties",
      icon: HomeIcon,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: TagIcon,
    },
  ];

  const adminUserItems = [
    {
      title: "Dashboard Page",
      url: "/dashboard",
      icon: GaugeIcon,
    },
    {
      title: "Houses",
      url: "/dashboard/properties",
      icon: HomeIcon,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: TagIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
  ];

  useEffect(() => {
    // Simulate fetching user data
    getCookie("user")
      .then((data) => {
        if (data) {
          let parsedUser;
          try {
            parsedUser = typeof data === "string" ? JSON.parse(data) : data;
          } catch (e) {
            parsedUser = data;
          }
          // setUser(parsedUser);
          // Check if the user is an admin
          if (
            (parsedUser && parsedUser.role === "admin") ||
            (parsedUser && parsedUser.role === "superadmin")
          ) {
            setItems(adminUserItems);
          } else {
            setItems(normalUserItems);
          }
        } else {
          // Default to normal user items if no user is found
          setItems(normalUserItems);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // Fallback to normal user items in case of error
        setItems(normalUserItems);
      });
  }, []);

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Quick Moves</SidebarGroupLabel>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <p>&copy; 2025 Rental Hub Ke</p>
      </SidebarFooter>
    </Sidebar>
  );
}
