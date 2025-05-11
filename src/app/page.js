"use client";

import { Button } from "@/components/ui/button";
import AuthProvider from "@/provider/provider";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <AuthProvider>
        <h1>THis is test app!</h1>
        <Button>Logout</Button>
      </AuthProvider>
    </div>
  );
}
