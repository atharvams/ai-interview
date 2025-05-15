"use client";
import { InterviewDataContext } from "@/contexts/interviewDataContext";
import React, { useState } from "react";

function Layout({ children }) {
  const [interviewData, setInterviewData] = useState({
    userName: "",
    userInterviewData: [],
  });
  return (
    <>
      <InterviewDataContext.Provider
        value={{ interviewData, setInterviewData }}
      >
        <div>{children}</div>
      </InterviewDataContext.Provider>
    </>
  );
}

export default Layout;
