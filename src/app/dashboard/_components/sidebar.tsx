"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/lib/axios";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/dashboard/home",
    icon: "https://res.cloudinary.com/dohpngcuj/image/upload/v1774816226/Frame_6_oxwldj.png",
  },
  {
    id: "my-task",
    label: "My Task",
    href: "/dashboard/my-task",
    icon: "https://res.cloudinary.com/dohpngcuj/image/upload/v1774816226/Frame_7_irzm6n.png",
  },
  {
    id: "profile",
    label: "Profile",
    href: "/dashboard/profile",
    icon: "https://res.cloudinary.com/dohpngcuj/image/upload/v1774816226/Frame_8_bk5mcv.png",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await api.post("/users/logout");

      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    } finally {
      setIsLoggingOut(false);
      setIsLogoutDialogOpen(false);
    }
  };

  return (
    <>
      <aside className="w-72 bg-gray-100 border-r border-gray-200 flex flex-col h-full">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Image
              src="https://res.cloudinary.com/dohpngcuj/image/upload/v1774858438/Frame_1_6_nak3rq.png"
              alt="Logo"
              width={150}
              height={150}
              className="object-contain pt-4"
            />
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-white text-gray-900 font-clash shadow-lg"
                    : "text-gray-700 font-clash hover:bg-gray-50"
                }`}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={54}
                  height={54}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 p-4">
          <button
            onClick={() => setIsLogoutDialogOpen(true)}
            className="flex font-clash items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-400 hover:text-white w-full transition-colors cursor-pointer"
          >
            <Image
              src="https://res.cloudinary.com/dohpngcuj/image/upload/v1774816226/Frame_9_h3fzjf.png"
              alt="Sign Out"
              width={54}
              height={54}
            />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      <AlertDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out? You will need to login again to
              access your tasks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel disabled={isLoggingOut}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoggingOut ? "Signing out..." : "Sign Out"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
