"use client";
import { useUser } from "@/provider/provider";
import Image from "next/image";
import React from "react";

function WelcomeHeader() {
  const { user } = useUser();

  return (
    <div className="bg-white rounded-2xl p-5 w-full flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">
          Welcome back, {user?.username}
        </h2>
        <h2 className="text-md text-gray-500">
          Next gen hassel free interview platform.
        </h2>
      </div>
      <div>
        {user && (
          <Image src={user?.picture} alt="user_avatar" width={40} height={40}  className="rounded-full"/>
        )}
      </div>
    </div>
  );
}

export default WelcomeHeader;
