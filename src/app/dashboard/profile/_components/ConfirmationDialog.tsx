"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: "name" | "password";
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  type,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type === "name" ? "Update Name" : "Update Password"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {type === "name"
              ? "Are you sure you want to update your name? This action cannot be undone."
              : "Are you sure you want to change your password? You will need to login again with your new password."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-3 justify-end">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {type === "name" ? "Update Name" : "Update Password"}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
