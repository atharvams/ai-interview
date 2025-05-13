"use client";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import QuestionContainer from "./questionContainer";
import { useUser } from "@/provider/provider";
import { v4 as uuidv4 } from "uuid";

function QuestionList({ formData, gotoPrevious, gotoNext }) {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState({});
  const { user } = useUser();
  const [saveQuestionLoading, setSaveQuestionsLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [formData]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/ai-model", {
        ...formData,
      });

      setQuestions(response.data.interviewQuestions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    try {
      setSaveQuestionsLoading(true);
      const id = uuidv4();
      const { data, error } = await supabase
        .from("interviews")
        .insert([
          {
            ...formData,
            questionList: questions,
            userEmail: user?.email,
            interviewId: id,
          },
        ])
        .select();
    } catch (error) {
      console.error(error);
    } finally {
      setSaveQuestionsLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-amber-100 rounded-xl border border-amber-200 flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="text-xl font-medium">
              Generating interview questions.
            </h2>
            <p className="text-primary">
              Our fine tuned Ai model is crafting questions as per your job role
            </p>
          </div>
        </div>
      )}
      {questions?.length > 0 && (
        <>
          <div className="p-5 rounded-xl bg-white border border-amber-300 flex flex-col gap-4">
            <QuestionContainer questions={questions} />
          </div>
          <div className="flex justify-center m-5">
            <Button
              onClick={() => onFinish()}
              className={"w-full cursor-pointer"}
              disable={saveQuestionLoading}
            >
              {setSaveQuestionsLoading && (
                <Loader2Icon className="animate-spin" />
              )}
              Finish
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default QuestionList;
