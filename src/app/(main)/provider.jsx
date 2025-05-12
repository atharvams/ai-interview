import { AppSidebar } from "@/components/common/appSidebar";
import WelcomeHeader from "@/components/common/welcomeHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

function DashboardProvider({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="w-full p-10">
          <WelcomeHeader />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}

export default DashboardProvider;
