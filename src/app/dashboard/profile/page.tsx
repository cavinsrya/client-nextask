"use client";

import React, { useState, useEffect } from "react";
import ProfileForm, { UserProfileData } from "./_components/ProfileForm";
import ProfileHeader from "./_components/ProfileHeader";
import api from "@/lib/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get<{ data: UserProfileData }>("/users/me");
      setUserProfile({
        name: response.data.data.name,
        email: response.data.data.email,
        password: "••••••••",
      });
    } catch (error: unknown) {
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (updatedProfile: UserProfileData) => {
    try {
      const payload: { name?: string; password?: string } = {};

      if (updatedProfile.name !== userProfile?.name) {
        payload.name = updatedProfile.name;
      }
      if (updatedProfile.password && updatedProfile.password !== "••••••••") {
        payload.password = updatedProfile.password;
      }

      const response = await api.put<{ data: UserProfileData }>(
        "/users/me",
        payload,
      );

      setUserProfile({
        name: response.data.data.name,
        email: response.data.data.email,
        password: "••••••••",
      });
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to update profile",
        );
      }
      throw error;
    }
  };

  if (isLoading || !userProfile) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl w-full">
      <ProfileHeader />
      <ProfileForm
        profile={userProfile}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
}
