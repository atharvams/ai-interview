import React from "react";
import DashboardProvider from "./provider";
import AuthProvider from "@/provider/provider";

function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <div className="bg-secondary">
        <DashboardProvider>
          <div>{children}</div>
        </DashboardProvider>
      </div>
    </AuthProvider>
  );
}

export default DashboardLayout;
