"use client";

import AnimatedBackground from "@/_components/AnimatedBackground";
import LoginCard from "./_components/LoginCard";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    await api.post("/users/login", {
      email,
      password,
    });

    router.push("/dashboard/home");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <AnimatedBackground />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <LoginCard onSubmit={handleLogin} />
      </div>
    </div>
  );
}
