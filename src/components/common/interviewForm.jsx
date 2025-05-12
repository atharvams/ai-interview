"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from "@/services/constants";
import { Butterfly_Kids } from "next/font/google";
import { Button } from "../ui/button";

function InterviewForm({ handleInterviewFromData }) {
  const [interviewType, setInterviewType] = useState([]);

  const addInterviewType = (type) => {
    const data = interviewType.includes(type);
    if (!data) {
      setInterviewType((prev) => [...prev, type]);
    } else {
      const result = interviewType.filter((item) => item != type);
      setInterviewType(result);
    }
  };
  useEffect(() => {
    if (interviewType) {
      handleInterviewFromData("interviewType", interviewType);
    }
  }, [interviewType]);

  return (
    <div className="bg-white p-5 rounded-xl">
      <div>
        <h2 className="text-sm font-medium">Job Position</h2>
        <Input
          onChange={(e) => {
            handleInterviewFromData("jobPosition", e.target.value);
          }}
          placeholder="e.g. Full Stack Developer"
          className="mt-2"
        />
      </div>
      <div className="mt-5">
        <h2 className="text-sm font-medium">Job Description</h2>
        <Textarea
          onChange={(e) => {
            handleInterviewFromData("jobDescription", e.target.value);
          }}
          placeholder={"Eg. Web3 engineer"}
          className={"h-[200px] mt-2"}
        />
      </div>
      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Duration</h2>
        <Select
          onValueChange={(e) => {
            handleInterviewFromData("interviewDuration", e);
          }}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15 min</SelectItem>
            <SelectItem value="30">30 min</SelectItem>
            <SelectItem value="45">45 min</SelectItem>
            <SelectItem value="1">1 min</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Type</h2>
        <div className="flex gap-3 flex-wrap mt-2">
          {InterviewType.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                addInterviewType(item.title);
              }}
              className={`flex items-center gap-3 p-1 px-2 bg-white border border-gray-300 rounded-xl hover:bg-amber-100 cursor-pointer ${
                interviewType.includes(item.title)
                  ? "bg-amber-100 text-primary"
                  : ""
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-7">
        <Button className={"w-full cursor-pointer"}>Generate Interview</Button>
      </div>
    </div>
  );
}

export default InterviewForm;
