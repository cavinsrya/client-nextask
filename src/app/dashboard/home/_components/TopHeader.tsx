"use client";

import React from "react";
import Image from "next/image";

interface HeaderProps {
  name: string;
  iconSrc?: string;
}

export default function TopHeader({
  name,
  iconSrc = "/icons/notification.svg",
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, <span>{name}</span>
        </h1>
        <p className="text-gray-600 mt-1">Let&apos;s Make Today Productive!</p>
      </div>
      {iconSrc && (
        <div className="w-10 h-10 flex items-center justify-center">
          <Image
            src={iconSrc}
            alt="notification"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </div>
      )}
    </div>
  );
}
