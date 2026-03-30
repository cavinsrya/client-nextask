"use client";

import React from "react";
import Image from "next/image";

interface InfoCard {
  id: string;
  icon: string;
  label: string;
  value: string | number;
  bgColor: string;
}

const defaultCards: InfoCard[] = [
  {
    id: "date",
    icon: "https://res.cloudinary.com/dohpngcuj/image/upload/v1774816225/Frame_2_qqkebp.png",
    label: "",
    value: "Sunday, 12 April 2026",
    bgColor: "bg-gray-900",
  },
  {
    id: "todo",
    icon: "https://res.cloudinary.com/dohpngcuj/image/upload/v1774816225/Frame_3_mztuc4.png",
    label: "ToDo",
    value: "5",
    bgColor: "bg-white",
  },
  {
    id: "in-progress",
    icon: "https://res.cloudinary.com/dohpngcuj/image/upload/v1774816226/Frame_4_dvoso1.png",
    label: "In Progress",
    value: "3",
    bgColor: "bg-white",
  },
  {
    id: "done",
    icon: "https://res.cloudinary.com/dohpngcuj/image/upload/v1774816225/Frame_5_t34sph.png",
    label: "Done",
    value: "4",
    bgColor: "bg-white",
  },
];

interface InfoCardsProps {
  cards?: InfoCard[];
}

export default function InfoCards({ cards = defaultCards }: InfoCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`rounded-2xl p-5 flex items-center gap-4 ${
            card.id === "date"
              ? card.bgColor
              : "bg-white border border-gray-200"
          }`}
        >
          {card.id === "date" ? (
            <>
              <div className="flex-1">
                <Image
                  src={card.icon}
                  alt={card.label}
                  width={50}
                  height={50}
                  className="mb-2"
                />
              </div>
              <p className="text-white font-semibold text-xl font-clash">
                {card.value}
              </p>
            </>
          ) : (
            <>
              <Image src={card.icon} alt={card.label} width={60} height={60} />
              <div>
                <div className="grid-row row">
                  <p className="text-gray-600 text-2xl font-clash font-medium">
                    {card.value}
                  </p>
                  <p className="text-gray-900 font-clash text-lg">
                    {card.label}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
