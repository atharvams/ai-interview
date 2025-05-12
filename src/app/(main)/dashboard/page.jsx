import DashboardScheduleInterviewOptions from "@/components/common/dashboardOptions";
import PreviousInterviews from "@/components/common/previousInterviews";
import WelcomeHeader from "@/components/common/welcomeHeader";
import React from "react";

function DashboardPage() {
  return (
    <>
      {/* <WelcomeHeader /> */}
      <h2 className="my-4 text-2xl font-bold">Dashboard</h2>
      <DashboardScheduleInterviewOptions />
      <h2 className="my-4 text-2xl font-bold">Recent Interviews</h2>
      <PreviousInterviews />
    </>
  );
}

export default DashboardPage;
