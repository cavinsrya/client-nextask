"use client";

import React, { useState, useEffect } from "react";
import Header from "./_components/TopHeader";
import InfoCards from "./_components/InfoCards";
import TaskFilters from "./_components/TaskFilters";
import TaskList from "./_components/TaskList";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Zap, AlertCircle, CheckCircle2 } from "lucide-react";

interface ApiTask {
  id: string;
  title: string;
  description: string | null;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string | null;
}

interface UITask {
  id: string;
  title: string;
  description: string;
  status: "ToDo" | "In Progress" | "Done";
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  icon: React.ReactNode;
}

interface UserProfile {
  name: string;
  email: string;
}

export default function HomePage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>("All Status");
  const [priorityFilter, setPriorityFilter] = useState<string>("All Priority");

  const [user, setUser] = useState<UserProfile | null>(null);
  const [tasks, setTasks] = useState<UITask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, tasksRes] = await Promise.all([
          api.get<{ data: UserProfile }>("/users/me"),
          api.get<{ data: ApiTask[] }>("/tasks/my-tasks"),
        ]);

        setUser(userRes.data.data);

        const mappedTasks: UITask[] = tasksRes.data.data.map(
          (task: ApiTask) => ({
            id: task.id,
            title: task.title,
            description: task.description || "No description provided.",
            status:
              task.status === "IN_PROGRESS"
                ? "In Progress"
                : task.status === "DONE"
                  ? "Done"
                  : "ToDo",
            priority:
              task.priority === "HIGH"
                ? "High"
                : task.priority === "MEDIUM"
                  ? "Medium"
                  : "Low",
            dueDate: task.dueDate
              ? `Due: ${new Date(task.dueDate).toLocaleDateString()}`
              : "No due date",
            icon:
              task.priority === "HIGH" ? (
                <Zap className="w-5 h-5 text-red-500" />
              ) : task.priority === "MEDIUM" ? (
                <AlertCircle className="w-5 h-5 text-orange-500" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
              ),
          }),
        );

        setTasks(mappedTasks);
      } catch (error: unknown) {
        toast.error("Session expired or unauthorized. Please login again.");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const todoCount = tasks.filter((t) => t.status === "ToDo").length;
  const inProgressCount = tasks.filter(
    (t) => t.status === "In Progress",
  ).length;
  const doneCount = tasks.filter((t) => t.status === "Done").length;

  const todayString = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dynamicCards = [
    {
      id: "date",
      icon: "https://res.cloudinary.com/dohpngcuj/image/upload/v1774816225/Frame_2_qqkebp.png",
      label: "",
      value: todayString,
      bgColor: "bg-gray-900",
    },
    {
      id: "todo",
      icon: "https://res.cloudinary.com/dohpngcuj/image/upload/v1774816225/Frame_3_mztuc4.png",
      label: "ToDo",
      value: todoCount,
      bgColor: "bg-white",
    },
    {
      id: "in-progress",
      icon: "https://res.cloudinary.com/dohpngcuj/image/upload/v1774816226/Frame_4_dvoso1.png",
      label: "In Progress",
      value: inProgressCount,
      bgColor: "bg-white",
    },
    {
      id: "done",
      icon: "https://res.cloudinary.com/dohpngcuj/image/upload/v1774816225/Frame_5_t34sph.png",
      label: "Done",
      value: doneCount,
      bgColor: "bg-white",
    },
  ];

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center h-screen">
        Loading your workspace...
      </div>
    );
  }

  return (
    <div className="p-8">
      <Header name={user?.name || "User"} iconSrc="/icons/notification.svg" />

      <InfoCards cards={dynamicCards} />

      <section>
        <TaskFilters
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
        />

        <TaskList
          tasks={tasks}
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
        />
      </section>
    </div>
  );
}
