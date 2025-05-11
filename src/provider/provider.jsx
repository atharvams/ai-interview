"use client";
import { supabase } from "@/services/supabaseClient";
import { useContext, useEffect, useState } from "react";
import { userDetailsContext } from "@/contexts/userContext";

function AuthProvider({ children }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    initializeUser();
  }, []);

  async function initializeUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user); //TODO: REMOVE IT

    let { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", user?.email);
    console.log(users); //TODO: REMOVE IT

    if (!users || users.length == 0) {
      const { data, error } = await supabase.from("users").insert([
        {
          email: user?.email,
          username: user?.user_metadata?.name,
          picture: user?.user_metadata?.picture,
        },
      ]);

      console.log(data); //TODO: REMOVE IT

      if (error) {
        console.error("Error while inserting user!");
        return;
      }

      setUser(data);
      return;
    }

    setUser(users[0]);
    return;
  }

  return (
    <>
      <userDetailsContext.Provider value={{ user }}>
        {children}
      </userDetailsContext.Provider>
    </>
  );
}

export default AuthProvider;

export const useUser = () => {
  const userContextToExport = useContext(userDetailsContext);
  return userContextToExport;
};
