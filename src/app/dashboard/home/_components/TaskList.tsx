"use client";

import React from "react";
import { AlertCircle, Zap, Eye } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "ToDo" | "In Progress" | "Done";
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  icon: React.ReactNode;
}

interface TaskListProps {
  tasks?: Task[];
  statusFilter?: string;
  priorityFilter?: string;
}

const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Client Onboarding Redesign",
    description: "Create content design for onboarding pa...",
    status: "In Progress",
    priority: "High",
    dueDate: "Due: 12 Apr 2026 | 11.00 AM",
    icon: <Zap className="w-5 h-5 text-red-500" />,
  },
  {
    id: "2",
    title: "Client Onboarding Redesign",
    description: "Create content design for onboarding pa...",
    status: "ToDo",
    priority: "High",
    dueDate: "Due: 12 Apr 2026 | 11.00 AM",
    icon: <Zap className="w-5 h-5 text-red-500" />,
  },
  {
    id: "3",
    title: "Client Onboarding Redesign",
    description: "Create content design for onboarding pa...",
    status: "In Progress",
    priority: "Medium",
    dueDate: "Due: 12 Apr 2026 | 11.00 AM",
    icon: <Eye className="w-5 h-5 text-blue-500" />,
  },
  {
    id: "4",
    title: "Client Onboarding Redesign",
    description: "Create content design for onboarding pa...",
    status: "Done",
    priority: "Medium",
    dueDate: "Due: 12 Apr 2026 | 11.00 AM",
    icon: <Eye className="w-5 h-5 text-blue-500" />,
  },
  {
    id: "5",
    title: "Client Onboarding Redesign",
    description: "Create content design for onboarding pa...",
    status: "In Progress",
    priority: "Low",
    dueDate: "Due: 12 Apr 2026 | 11.00 AM",
    icon: <Eye className="w-5 h-5 text-blue-500" />,
  },
  {
    id: "6",
    title: "Client Onboarding Redesign",
    description: "Create content design for onboarding pa...",
    status: "In Progress",
    priority: "Low",
    dueDate: "Due: 12 Apr 2026 | 11.00 AM",
    icon: <AlertCircle className="w-5 h-5 text-orange-500" />,
  },
  {
    id: "7",
    title: "Client Onboarding Redesign",
    description: "Create content design for onboarding pa...",
    status: "In Progress",
    priority: "Low",
    dueDate: "Due: 12 Apr 2026 | 11.00 AM",
    icon: <AlertCircle className="w-5 h-5 text-orange-500" />,
  },
];

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "In Progress":
      return "bg-blue-500 text-white";
    case "ToDo":
      return "bg-gray-500 text-white";
    case "Done":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export default function TaskList({
  tasks = defaultTasks,
  statusFilter = "All Status",
  priorityFilter = "All Priority",
}: TaskListProps) {
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      statusFilter === "All Status" || task.status === statusFilter;
    const priorityMatch =
      priorityFilter === "All Priority" || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="mb-4">
        <h2 className="font-clash text-2xl font-semibold text-gray-900">
          Task List
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage and track your active tasks.
        </p>
      </div>

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow-md border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:shadow-md hover:bg-white transition-all duration-200 cursor-pointer"
          >
            <div className="flex-shrink-0">{task.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 font-clash">
                {task.title}
              </h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                  task.status,
                )}`}
              >
                {task.status}
              </span>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                {task.dueDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
