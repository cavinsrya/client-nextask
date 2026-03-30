"use client";

import { TaskStatus, Task } from "../page";
import { TaskCard } from "./TaskCard";
import Image from "next/image";

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onCheckboxChange: (taskId: string) => void;
  onMoveTask: (taskId: string, newStatus: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
}

export function KanbanColumn({
  status,
  tasks,
  onTaskClick,
  onCheckboxChange,
  onMoveTask,
  onDeleteTask,
}: KanbanColumnProps) {
  const getColumnConfig = () => {
    switch (status) {
      case "todo":
        return {
          title: "To Do",
          count: tasks.length,
          icon: "https://res.cloudinary.com/dohpngcuj/image/upload/v1774816225/Frame_3_mztuc4.png",
          borderColor: "border-blue-200",
          bgColor: "bg-blue-50",
        };
      case "inProgress":
        return {
          title: "In Progress",
          count: tasks.length,
          icon: "https://res.cloudinary.com/dohpngcuj/image/upload/v1774816226/Frame_4_dvoso1.png",
          borderColor: "border-orange-200",
          bgColor: "bg-orange-50",
        };
      case "done":
        return {
          title: "Done",
          count: tasks.length,
          icon: "https://res.cloudinary.com/dohpngcuj/image/upload/v1774816225/Frame_5_t34sph.png",
          borderColor: "border-green-200",
          bgColor: "bg-green-50",
        };
    }
  };

  const config = getColumnConfig();

  return (
    <div
      className={`flex-1 min-w-0 rounded-lg border-dashed border-2 ${config.borderColor} ${config.bgColor} p-4`}
    >
      <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
        <div className="flex items-center gap-2">
          <Image src={config.icon} alt={status} width={60} height={60} />
          <div>
            <h3 className="font-semibold text-gray-900 font-clash text-xl">
              {config.title}
            </h3>
            <p className="text-xs text-gray-600">{config.count} tasks</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-md text-gray-500 font-clash">
              Yuhu, you dont have a task yet
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onTaskClick={onTaskClick}
              onCheckboxChange={onCheckboxChange}
              onMoveTask={onMoveTask}
              onDeleteTask={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
