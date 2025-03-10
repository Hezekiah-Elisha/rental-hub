import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
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
  GaugeIcon
} from "lucide-react";

// Menu items.
const items = [
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

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <p>© 2025 Hub Ke</p>
      </SidebarFooter>
    </Sidebar>
  );
}
