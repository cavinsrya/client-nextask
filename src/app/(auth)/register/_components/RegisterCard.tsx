"use client";

import React, { useState } from "react";
import FormInput from "@/_components/FormInput";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { isAxiosError } from "axios";
import { toast } from "sonner";

interface RegisterCardProps {
  onSubmit?: (name: string, email: string, password: string) => void;
}

export default function RegisterCard({ onSubmit }: RegisterCardProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name) {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(name, email, password);
      }

      toast.success("Account created successfully! Please login.");

      setName("");
      setEmail("");
      setPassword("");
      setErrors({});
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";

      if (isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-center mb-8">
          <Image
            src="https://res.cloudinary.com/dohpngcuj/image/upload/v1774812089/Frame_1_5_iijtb0.png"
            alt="Logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            type="text"
            placeholder="Kevin De Bruyne"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            icon={<User className="w-4 h-4" />}
          />

          <FormInput
            type="email"
            placeholder="your@email.com"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            icon={<Mail className="w-4 h-4" />}
          />

          <FormInput
            type="password"
            placeholder="••••••••"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            icon={<Lock className="w-4 h-4" />}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r  from-slate-500 to-slate-900 hover:from-slate-900 hover:to-slate-500 disabled:from-slate-400 disabled:to-slate-400 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
