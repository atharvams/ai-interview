"use client";
import { PersonStanding, UserRound, VideoIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

function PreviousInterviews() {
  const [recentInterviews, setRecentInterviews] = useState([]);
  return (
    <div className="my-5 flex items-center justify-center">
      {recentInterviews.length === 0 && (
        <div className="flex flex-col gap-3 items-center">
          <UserRound className="p-3 text-primary bg-amber-100 h-20 w-20" />
          <h2>You don't have any previous interviews!</h2>
          <Button>+ Create interview</Button>
        </div>
      )}
    </div>
  );
}

export default PreviousInterviews;
