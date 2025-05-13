"use client";
import { InterviewDataContext } from "@/contexts/interviewDataContext";
import { Clock, Mic, MicOff } from "lucide-react";
import React, { useContext, useState } from "react";

function JoinMeeting() {
  const [isMuted, setIsMuted] = useState(false);
  const [timer, setTimer] = useState("00:05:23");
  const { interviewData, setInterviewData } = useContext(InterviewDataContext);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-medium">AI Interview Session</h1>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="font-mono">{timer}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex justify-center items-center relative h-[260px] bg-transparent">
            <div className="relative rounded-lg overflow-hidden">
              <div className="bg-amber-300 w-[480px] h-[240px] flex items-center justify-center">
                Interviewer
              </div>
              <div className="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded-md text-sm text-white">
                AI Interviewer
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center relative h-[260px] bg-transparent">
            <div className="relative rounded-lg overflow-hidden">
              <div className="bg-amber-300 w-[480px] h-[240px] flex items-center justify-center">
                Candidate
              </div>
              <div className="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded-md text-sm text-white">
                You
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <button
              className="w-12 h-12 rounded-full bg-[#2a2f38] flex items-center justify-center hover:bg-[#3a3f48] transition-colors"
              aria-label="Microphone"
            >
              <Mic className="w-5 h-5 text-white" />
            </button>
            <button
              className="w-12 h-12 rounded-full bg-[#f13b3b] flex items-center justify-center hover:bg-[#e03030] transition-colors"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <Mic className="w-5 h-5 text-white" />
              ) : (
                <MicOff className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
          <p className="text-gray-400 mt-2">Interview in progress...</p>
        </div>
      </div>
    </div>
  );
}

export default JoinMeeting;
