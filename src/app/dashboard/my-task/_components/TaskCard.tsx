"use client";

import { TaskStatus, Task } from "../page";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  AlertCircle,
  Zap,
  EqualApproximately,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

interface TaskCardProps {
  task: Task;
  onTaskClick: (task: Task) => void;
  onCheckboxChange: (taskId: string) => void;
  onMoveTask: (taskId: string, newStatus: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskCard({
  task,
  onTaskClick,
  onCheckboxChange,
  onMoveTask,
  onDeleteTask,
}: TaskCardProps) {
  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "bg-red-100 text-red-800 font-clash";
      case "medium":
        return "bg-yellow-100 text-yellow-800 font-clash";
      case "low":
        return "bg-blue-100 text-blue-800 font-clash";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = () => {
    switch (task.priority) {
      case "high":
        return <Zap className="w-4 h-4" />;
      case "medium":
        return <EqualApproximately className="w-4 h-4" />;
      case "low":
        return <ChevronDown className="w-4 h-4 opacity-50" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onTaskClick(task)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => {
                onCheckboxChange(task.id);
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor()}`}
            >
              {getPriorityIcon()}
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>

          <h3 className="font-semibold font-clash text-gray-900 text-sm mb-1 line-clamp-1">
            {task.title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2 break-words">
            {task.description}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
            <button className="flex-shrink-0 p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {task.status === "todo" && (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveTask(task.id, "inProgress");
                }}
              >
                Move to In Progress
              </DropdownMenuItem>
            )}
            {task.status !== "done" && (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveTask(task.id, "done");
                }}
              >
                Move to Done
              </DropdownMenuItem>
            )}
            {task.status === "inProgress" && (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveTask(task.id, "todo");
                }}
              >
                Move to To Do
              </DropdownMenuItem>
            )}
            {task.status === "done" && (
              <>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveTask(task.id, "inProgress");
                  }}
                >
                  Move to In Progress
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveTask(task.id, "todo");
                  }}
                >
                  Move to To Do
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTask(task.id);
              }}
              className="text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        {task.dueDate && (
          <span>
            Due:{" "}
            {new Date(task.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        )}
        {task.dueTime && <span> | {task.dueTime}</span>}
      </div>
    </div>
  );
}
