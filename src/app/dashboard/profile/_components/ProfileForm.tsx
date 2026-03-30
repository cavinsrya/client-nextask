"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ConfirmationDialog from "./ConfirmationDialog";

export interface UserProfileData {
  name: string;
  email: string;
  password?: string;
}

interface ProfileFormProps {
  profile: UserProfileData;
  onProfileUpdate: (profile: UserProfileData) => Promise<void>;
}

export default function ProfileForm({
  profile,
  onProfileUpdate,
}: ProfileFormProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  const [tempPassword, setTempPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmType, setConfirmType] = useState<"name" | "password">("name");

  const handleEditName = () => {
    setTempName(profile.name);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    if (!tempName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setConfirmType("name");
    setShowConfirmDialog(true);
  };

  const handleEditPassword = () => {
    setTempPassword("");
    setConfirmPassword("");
    setIsEditingPassword(true);
  };

  const handleSavePassword = () => {
    if (!tempPassword.trim()) {
      toast.error("Password cannot be empty");
      return;
    }
    if (tempPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (tempPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setConfirmType("password");
    setShowConfirmDialog(true);
  };

  const handleConfirm = async () => {
    setShowConfirmDialog(false);

    try {
      if (confirmType === "name") {
        await onProfileUpdate({ ...profile, name: tempName });
        setIsEditingName(false);
        toast.success("Name updated successfully");
      } else if (confirmType === "password") {
        await onProfileUpdate({ ...profile, password: tempPassword });
        setIsEditingPassword(false);
        setTempPassword("");
        setConfirmPassword("");
        toast.success("Password updated successfully");
      }
    } catch (error) {
      const errorMessage = "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleCancelName = () => {
    setIsEditingName(false);
    setTempName(profile.name);
  };
  const handleCancelPassword = () => {
    setIsEditingPassword(false);
    setTempPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 font-clash">
                Full Name
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Update your full name
              </p>
            </div>
            {!isEditingName && (
              <Button
                onClick={handleEditName}
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                Edit
              </Button>
            )}
          </div>

          {isEditingName ? (
            <div className="space-y-4">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter your full name"
                className="border-gray-300"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveName}
                  className="bg-black hover:bg-slate-700 py-4 cursor-pointer"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancelName}
                  variant="outline"
                  className="py-4 cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 font-medium">{profile.name}</p>
          )}
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 font-clash">
                Email Address
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Your email cannot be changed
              </p>
            </div>
          </div>
          <p className="text-gray-700 font-medium">{profile.email}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 font-clash">
                Password
              </h3>
              <p className="text-sm text-gray-500 mt-1">Update your password</p>
            </div>
            {!isEditingPassword && (
              <Button
                onClick={handleEditPassword}
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                Change
              </Button>
            )}
          </div>

          {isEditingPassword ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  New Password
                </label>
                <Input
                  type="password"
                  value={tempPassword}
                  onChange={(e) => setTempPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="border-gray-300 mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="border-gray-300 mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSavePassword}
                  className="bg-black hover:bg-slate-700 py-4 cursor-pointer"
                >
                  Update Password
                </Button>
                <Button
                  onClick={handleCancelPassword}
                  variant="outline"
                  className="py-4 cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 font-medium">{profile.password}</p>
          )}
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirm}
        type={confirmType}
      />
    </>
  );
}
