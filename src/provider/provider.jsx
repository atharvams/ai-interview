"use client";
import { supabase } from "@/services/supabaseClient";
import { useContext, useEffect, useState } from "react";
import { UserDetailsContext } from "@/contexts/userContext";

function AuthProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    initializeUser();
  }, []);

  async function initializeUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", user?.email);

    if (!users || users.length == 0) {
      const { data, error } = await supabase.from("users").insert([
        {
          email: user?.email,
          username: user?.user_metadata?.name,
          picture: user?.user_metadata?.avatar_url,
        },
      ]);

      if (error) {
        console.error("Error while inserting user!");
        return;
      }

      console.log("new user data:");
      console.log(data); //TODO: REMOVE IT
      setUser(data);

      return;
    }
    console.log("Existing user data:");
    console.log(users[0])
    setUser(users[0]);
    return;
  }

  return (
    <>
      <UserDetailsContext.Provider value={{ user, setUser }}>
        {children}
      </UserDetailsContext.Provider>
    </>
  );
}

export default AuthProvider;

export const useUser = () => {
  const userContextToExport = useContext(UserDetailsContext);
  return userContextToExport;
};
