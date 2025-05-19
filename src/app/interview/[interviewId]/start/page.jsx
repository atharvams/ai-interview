"use client";
import { InterviewDataContext } from "@/contexts/interviewDataContext";
import { Clock, Mic, MicOff, Phone } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { assistantOption } from "@/services/constants";
import AlertDialogue from "@/components/common/alertDialogue";

function JoinMeeting() {
  const [isMuted, setIsMuted] = useState(false);
  const [timer, setTimer] = useState("00:00:00");
  const { interviewData } = useContext(InterviewDataContext);
  const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY || "";
  const [vapi, setVapi] = useState(null);
  const [status, setStatus] = useState("Ready");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isApiKeyValid, setIsApiKeyValid] = useState(true);

  // Initialize Vapi on client-side only
  useEffect(() => {
    let vapiInstance = null;

    if (typeof window !== "undefined") {
      if (!apiKey) {
        setErrorMessage(
          "API key is missing. Please check your environment variables."
        );
        setStatus("Error");
        setIsApiKeyValid(false);
        return;
      }

      // Import Vapi dynamically
      import("@vapi-ai/web")
        .then((module) => {
          const Vapi = module.default;

          // Initialize Vapi
          vapiInstance = new Vapi(apiKey);
          setVapi(vapiInstance);
          setIsApiKeyValid(true);

          // Set up event listeners
          vapiInstance.on("call-start", () => {
            setIsConnecting(false);
            setIsConnected(true);
            setErrorMessage("");
            setStatus("Connected");
          });

          vapiInstance.on("call-end", () => {
            setIsConnecting(false);
            setIsConnected(false);
            setStatus("Call ended");
          });

          vapiInstance.on("speech-start", () => {
            setIsSpeaking(true);
          });

          vapiInstance.on("speech-end", () => {
            setIsSpeaking(false);
          });

          vapiInstance.on("volume-level", (level) => {
            setVolumeLevel(level);
          });

          vapiInstance.on("error", (error) => {
            console.error("Vapi error:", error);
            setIsConnecting(false);

            if (
              error?.error?.statusCode === 401 ||
              error?.error?.statusCode === 403
            ) {
              setErrorMessage(
                "API key is invalid. Please check your environment variables."
              );
              setIsApiKeyValid(false);
            } else {
              setErrorMessage(error?.error?.message || "An error occurred");
            }

            setStatus("Error");
          });
        })
        .catch((err) => {
          console.error("Failed to load Vapi:", err);
          setErrorMessage("Failed to load Vapi library");
          setStatus("Error");
        });
    }

    return () => {
      if (vapiInstance) {
        vapiInstance.stop();
      }
    };
  }, []);

  // Effect to start the call when interview data is available
  useEffect(() => {
    if (
      vapi &&
      interviewData?.userName &&
      interviewData?.userInterviewData?.length > 0
    ) {
      console.log("Data available, can start call now");
      // startCall();
    }
  }, [vapi, interviewData]);

  // Start call function
  const startCall = () => {
    if (!isApiKeyValid) {
      setErrorMessage("Cannot start call: API key is invalid or missing.");
      return;
    }

    if (!vapi) {
      setErrorMessage("Vapi instance is not ready yet");
      return;
    }

    if (!interviewData?.userName || !interviewData?.userInterviewData?.length) {
      setErrorMessage("Interview data is not available");
      return;
    }

    setIsConnecting(true);
    setStatus("Connecting...");
    setErrorMessage("");

    // Prepare interview questions.
    let interviewQuestionList = "";
    interviewData.userInterviewData[0].questionList?.forEach((element) => {
      interviewQuestionList +=
        element.question + ", type:" + element.type + ", ";
    });

    const modifiedAssistantOption = JSON.parse(JSON.stringify(assistantOption));

    // Replace placeholders in the assistant options
    modifiedAssistantOption.firstMessage = modifiedAssistantOption.firstMessage
      .replace("{{userName}}", interviewData.userName)
      .replace(
        "{{JobPosition}}",
        interviewData.userInterviewData[0].jobPosition
      );

    modifiedAssistantOption.model.messages[0].content =
      modifiedAssistantOption.model.messages[0].content
        .replace(
          "{{jobPosition}}",
          interviewData.userInterviewData[0].jobPosition
        )
        .replace("{{questionList}}", interviewQuestionList);

    console.log("Starting call with options:", modifiedAssistantOption);
    vapi.start(modifiedAssistantOption);
  };

  useEffect(() => {
    let interval;
    const totalSeconds =
      Number(interviewData.userInterviewData[0].interviewDuration) * 60;

    let remainingSeconds = totalSeconds;

    if (isConnected) {
      interval = setInterval(() => {
        if (remainingSeconds > 0) {
          remainingSeconds -= 1;

          const minutes = String(Math.floor(remainingSeconds / 60)).padStart(
            2,
            "0"
          );
          const seconds = String(remainingSeconds % 60).padStart(2, "0");

          setTimer(`00:${minutes}:${seconds}`);
        } else {
          clearInterval(interval);
          setTimer("00:00:00");
          endCall(); // Automatically end the call once timer is off
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isConnected]);

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-medium">AI Interview Session</h1>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="font-mono">{timer}</span>
          </div>
        </div>

        {/* Status and error display */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        {status !== "Ready" && !errorMessage && (
          <div className="bg-amber-100 border border-amber-400 text-amber-700 px-4 py-3 rounded mb-4">
            Status: {status}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex justify-center items-center relative h-[260px] bg-transparent">
            <div className="relative rounded-lg overflow-hidden">
              <div className="bg-amber-300 w-[480px] h-[240px] flex items-center justify-center">
                AI Interviewer {isSpeaking ? "(Speaking)" : ""}
              </div>
              <div className="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded-md text-sm text-white">
                AI Interviewer
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center relative h-[260px] bg-transparent">
            <div className="relative rounded-lg overflow-hidden">
              <div className="bg-amber-300 w-[480px] h-[240px] flex items-center justify-center">
                {interviewData?.userName || "User"}
                {volumeLevel > 0.1 && " (Speaking)"}
              </div>
              <div className="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded-md text-sm text-white">
                You
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            {!isConnected && (
              <button
                onClick={startCall}
                disabled={isConnecting || !isApiKeyValid}
                className="px-4 py-2 bg-green-500 text-white rounded-2xl hover:bg-green-600 disabled:bg-gray-400"
              >
                {isConnecting ? "Connecting..." : "Start Interview"}
              </button>
            )}

            <AlertDialogue stopInterview={endCall}>
              <h2 className="w-12 h-12 rounded-full bg-[#f13b3b] flex items-center justify-center hover:bg-[#e03030] transition-colors cursor-pointer">
                <Phone className="w-5 h-5 text-white" />
              </h2>
            </AlertDialogue>
          </div>
          <p className="text-gray-400 mt-2">
            {isConnected
              ? "Interview in progress..."
              : "Ready to start interview"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default JoinMeeting;
