"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/services/supabaseClient";

function Login() {
  //sign in with google
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Signin error: ", error);
    }
  };



  
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-sm flex flex-col justify-center items-center border rounded-2xl border-gray-300 p-6 shadow-md">
        <h2 className="text-3xl font-bold text-center mt-2">
          Welcome to <span className="text-amber-500">HireXpert</span>
        </h2>
        <p className="text-md text-gray-500 text-center pt-1">
          Login with your Google account or email
        </p>

        <div className="w-full mt-4 flex flex-col gap-4">
          <Button
            className="flex items-center justify-center gap-2 w-full"
            onClick={signInWithGoogle}
          >
            <LogIn size={18} />
            Login with Google
          </Button>

          <hr className="border-gray-300" />

          <h2 className="text-2xl font-bold text-center mt-2">Login</h2>
          <Input placeholder="Email: John Wick" type="email" />
          <Input placeholder="Password: WhoStoleMyCar!" type="password" />
          <Button className="w-full">Login</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
