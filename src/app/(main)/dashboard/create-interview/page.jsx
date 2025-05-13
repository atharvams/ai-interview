"use client";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import InterviewForm from "@/components/common/interviewForm";
import QuestionList from "@/components/common/questionList";
import { toast } from "sonner";

function CreateInterview() {
  const router = useRouter();
  const [progressSteps, setProgresSteps] = useState(1); //TODO: Total steps 5

  const [formData, setFormData] = useState({
    jobPosition: "",
    jobDescription: "",
    interviewDuration: "",
    interviewType: [],
  });

  const handleInterviewFromData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    console.log("formData: ", formData);
  };

  const gotoNext = () => {
    if (progressSteps === 1) {
      if (validateFormData()) {
        setProgresSteps(2);
      }
    } else {
      setProgresSteps(progressSteps + 1);
    }
  };

  const gotoPrevious = () => {
    if (progressSteps > 1) {
      setProgresSteps(progressSteps - 1);
    } else {
      router.back();
    }
  };

  const validateFormData = () => {
    if (!formData.jobPosition || formData.jobPosition.trim() === "") {
      toast("Please enter a job position");
      return false;
    }

    if (!formData.jobDescription || formData.jobDescription.trim() === "") {
      toast("Please enter a job description");
      return false;
    }

    if (!formData.interviewDuration) {
      toast("Please select an interview duration");
      return false;
    }
    return true;
  };

  return (
    <div className="mt-10 px-10 md:px-24 lg:px-44 xl:px-56 ">
      <div className="flex items-center ">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl pl-3">Create new interview</h2>
      </div>
      <Progress value={progressSteps * 20} className="my-5" />
      {progressSteps == 1 && 
        <InterviewForm
          formData={formData}
          handleInterviewFromData={handleInterviewFromData}
          gotoNext={gotoNext}
        />
      }
      {progressSteps == 2 && 
        <QuestionList
          formData={formData}
          gotoPrevious={gotoPrevious}
          gotoNext={gotoNext}
        />
      }
    </div>
  );
}

export default CreateInterview;
