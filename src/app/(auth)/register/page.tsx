"use client";

import AnimatedBackground from "@/_components/AnimatedBackground";
import RegisterCard from "./_components/RegisterCard";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
  ) => {
    await api.post("/users/register", {
      name,
      email,
      password,
    });

    router.push("/login");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <RegisterCard onSubmit={handleRegister} />
      </div>
    </div>
  );
}
