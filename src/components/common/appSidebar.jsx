"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Calendar,
  LayoutDashboard,
  List,
  ReceiptIndianRupee,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { SidebarOptions } from "@/services/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className={"flex items-center mt-4"}>
        <h1 className="text-3xl font-bold font-mono">HireXpert</h1>
        <Button className={"w-full mt-4"}>
          <Plus /> Create new interview
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SidebarOptions.map((item) => (
                <SidebarMenuItem key={item.name} className={"p-1"}>
                  <SidebarMenuButton asChild className={"p-5"}>
                    <Link href={item.path} className="font-medium">
                      <item.icon
                        className={`${
                          path === item.path ? "text-primary" : ""
                        }`}
                      />
                      <span
                        className={`${
                          path === item.path ? "text-primary" : ""
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
