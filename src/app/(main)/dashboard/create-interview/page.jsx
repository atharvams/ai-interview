"use client";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import InterviewForm from "@/components/common/interviewForm";

function CreateInterview() {
  const router = useRouter();
  const [progressSteps, setProgresSteps] = useState(1); //TODO: Total steps 5
  const [formData, setFormData] = useState();

  const handleInterviewFromData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    console.log("formData: ", formData);
  };

  return (
    <div className="mt-10 px-10 md:px-24 lg:px-44 xl:px-56 ">
      <div className="flex items-center ">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl pl-3">Create new interview</h2>
      </div>
      <Progress value={progressSteps * 20} className="my-5" />
      <InterviewForm handleInterviewFromData={handleInterviewFromData} />
    </div>
  );
}

export default CreateInterview;
