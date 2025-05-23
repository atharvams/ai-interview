"use client";

import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Video } from "lucide-react";
import { supabase } from "@/services/supabaseClient";
import { InterviewDataContext } from "@/contexts/interviewDataContext";
import { useRouter } from "next/navigation";

function InterviewJoinPage() {
  const { interviewId } = useParams();
  const [userData, setUserData] = useState();
  const [dataLoading, setDataLoading] = useState(false);
  const [username, setUsername] = useState();
  const { interviewData, setInterviewData } = useContext(InterviewDataContext);
  const router = useRouter();

  useEffect(() => {
    if (interviewId) {
      getInterviewDetails();
      console.log("getInteriviewdetailsCalled");
    }
  }, []);

  const getInterviewDetails = async () => {
    setDataLoading(true);
    try {
      const { data: interviews, error } = await supabase
        .from("interviews")
        .select("jobPosition,interviewDuration")
        .eq("interviewId", interviewId);

      setUserData(interviews[0]);
      setDataLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const joinInterview = async () => {
    try {
      setDataLoading(true);
      const { data: interviews, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("interviewId", interviewId);

      if (error) throw error;

      const updatedData = {
        userName: username,
        userInterviewData: interviews,
      };
      console.log(updatedData);

      setInterviewData(updatedData);
      setDataLoading(false);

      console.log("interview data");
      console.log(updatedData);

      router.push("/interview/" + interviewId + "/start");
    } catch (error) {
      console.error(error);
      setDataLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-primary">HireXpert</h1>
          <p className="text-gray-600">AI-Powered Interview Platform</p>
        </div>

        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {userData?.jobPosition}
          </h2>
          <div className="mt-2 flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              {userData?.interviewDuration} Minutes
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="fullName"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Enter your full name
          </label>
          <Input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            id="fullName"
            placeholder="e.g., John Smith"
            className="w-full"
          />
        </div>

        <div className="mb-6 rounded-md bg-amber-50 p-4">
          <div className="flex items-start">
            <div>
              <h3 className="text-sm font-medium text-primary">
                Before you begin
              </h3>
              <ul className="mt-2 list-inside space-y-1 text-sm text-primary">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Ensure you have a stable internet connection</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Test your camera and microphone</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Find a quiet place for the interview</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          onClick={joinInterview}
          className="mb-4 w-full bg-primary hover:bg-amber-600"
          disabled={dataLoading || !username}
        >
          <Video className="mr-2 h-4 w-4" />
          Join Interview
        </Button>

        <div className="flex items-center justify-center text-sm text-gray-600">
          <Settings className="mr-1 h-4 w-4" />
          <button className="hover:text-primary hover:underline">
            Test Audio & Video
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewJoinPage;
