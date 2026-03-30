"use client";

import { useState, useEffect } from "react";
import { CreateTaskModal } from "./_components/CreateTaskModal";
import { ViewEditTaskModal } from "./_components/ViewEditTaskModal";
import { KanbanColumn } from "./_components/KanbanColumn";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export type TaskStatus = "todo" | "inProgress" | "done";
export type TaskPriority = "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  dueTime: string;
  completed: boolean;
}

interface ApiTask {
  id: string;
  title: string;
  description: string | null;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string | null;
  createdAt: string;
}

const statusToApi: Record<TaskStatus, ApiTask["status"]> = {
  todo: "TODO",
  inProgress: "IN_PROGRESS",
  done: "DONE",
};

const priorityToApi: Record<TaskPriority, ApiTask["priority"]> = {
  high: "HIGH",
  medium: "MEDIUM",
  low: "LOW",
};

const mapApiToUiTask = (apiTask: ApiTask): Task => {
  let dateStr = "";
  let timeStr = "";

  if (apiTask.dueDate) {
    const d = new Date(apiTask.dueDate);
    dateStr = d.toISOString().split("T")[0];
    timeStr = d.toTimeString().slice(0, 5);
  }

  return {
    id: apiTask.id,
    title: apiTask.title,
    description: apiTask.description || "",
    status:
      apiTask.status === "TODO"
        ? "todo"
        : apiTask.status === "IN_PROGRESS"
          ? "inProgress"
          : "done",
    priority: apiTask.priority.toLowerCase() as TaskPriority,
    dueDate: dateStr,
    dueTime: timeStr,
    completed: apiTask.status === "DONE",
  };
};

const formatApiDate = (date?: string, time?: string): string | undefined => {
  if (!date) return undefined;
  return new Date(`${date}T${time || "00:00"}:00`).toISOString();
};

export default function MyTaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<{ data: ApiTask[] }>("/tasks/my-tasks");
      const mappedTasks = response.data.data.map(mapApiToUiTask);
      setTasks(mappedTasks);
    } catch (error: unknown) {
      toast.error("Failed to load tasks.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (newTask: Omit<Task, "id" | "completed">) => {
    try {
      const response = await api.post<{ data: ApiTask }>("/tasks", {
        title: newTask.title,
        description: newTask.description,
        status: statusToApi[newTask.status],
        priority: priorityToApi[newTask.priority],
        dueDate: formatApiDate(newTask.dueDate, newTask.dueTime),
      });

      const createdTask = mapApiToUiTask(response.data.data);
      setTasks((prev) => [createdTask, ...prev]);
      setIsCreateModalOpen(false);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to create task");
      }
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const response = await api.put<{ data: ApiTask }>(
        `/tasks/${updatedTask.id}`,
        {
          title: updatedTask.title,
          description: updatedTask.description,
          status: statusToApi[updatedTask.status],
          priority: priorityToApi[updatedTask.priority],
          dueDate: formatApiDate(updatedTask.dueDate, updatedTask.dueTime),
        },
      );

      const savedTask = mapApiToUiTask(response.data.data);
      setTasks((prev) =>
        prev.map((t) => (t.id === savedTask.id ? savedTask : t)),
      );
      toast.success("Task updated successfully");
    } catch (error: unknown) {
      toast.error("Failed to update task");
    }
  };

  const handleMoveTask = async (taskId: string, newStatus: TaskStatus) => {
    const statusLabels: Record<TaskStatus, string> = {
      todo: "To Do",
      inProgress: "In Progress",
      done: "Done",
    };

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: newStatus, completed: newStatus === "done" }
          : t,
      ),
    );

    try {
      await api.put(`/tasks/${taskId}`, { status: statusToApi[newStatus] });
      toast.success(`Task moved to ${statusLabels[newStatus]}`);
    } catch (error: unknown) {
      toast.error("Failed to move task");
      fetchTasks();
    }
  };

  const handleCheckboxChange = async (taskId: string) => {
    const taskToUpdate = tasks.find((t) => t.id === taskId);
    if (!taskToUpdate) return;

    const isCurrentlyCompleted = taskToUpdate.completed;
    const newStatus: TaskStatus = isCurrentlyCompleted ? "inProgress" : "done";

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId)
          return { ...t, completed: !isCurrentlyCompleted, status: newStatus };
        return t;
      }),
    );

    try {
      await api.put(`/tasks/${taskId}`, { status: statusToApi[newStatus] });
      if (!isCurrentlyCompleted) toast.success("Task marked as done");
      else toast.info("Task moved back to In Progress");
    } catch (error: unknown) {
      toast.error("Failed to update task status");
      fetchTasks();
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      toast.success("Task deleted successfully");
    } catch (error: unknown) {
      toast.error("Failed to delete task");
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "inProgress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        Loading your board...
      </div>
    );
  }

  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2 font-clash font-semibold">
          My Task
        </h1>
        <p className="text-gray-600">Let&apos;s Make Today Productive!</p>
      </div>

      <Button
        onClick={() => setIsCreateModalOpen(true)}
        className="mb-8 h-auto py-2 pl-4 pr-6 bg-white hover:bg-gray-50 text-black flex items-center gap-3 font-clash text-lg border border-gray-200 rounded-xl shadow-sm transition-all cursor-pointer"
      >
        <Image
          src="https://res.cloudinary.com/dohpngcuj/image/upload/v1774853566/Frame_11_1_yte7e2.png"
          alt="create"
          width={25}
          height={25}
          className="rounded-lg"
        />
        Create Task
      </Button>

      <div className="flex gap-6 overflow-x-auto pb-4">
        <KanbanColumn
          status="todo"
          tasks={todoTasks}
          onTaskClick={handleTaskClick}
          onCheckboxChange={handleCheckboxChange}
          onMoveTask={handleMoveTask}
          onDeleteTask={handleDeleteTask}
        />
        <KanbanColumn
          status="inProgress"
          tasks={inProgressTasks}
          onTaskClick={handleTaskClick}
          onCheckboxChange={handleCheckboxChange}
          onMoveTask={handleMoveTask}
          onDeleteTask={handleDeleteTask}
        />
        <KanbanColumn
          status="done"
          tasks={doneTasks}
          onTaskClick={handleTaskClick}
          onCheckboxChange={handleCheckboxChange}
          onMoveTask={handleMoveTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTask={handleCreateTask}
      />

      <ViewEditTaskModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        task={selectedTask}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  );
}
