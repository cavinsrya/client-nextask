"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TaskPriority, Task } from "../page";
import Image from "next/image";
import { toast } from "sonner";
import { ChevronDown, EqualApproximately, Zap } from "lucide-react";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Omit<Task, "id" | "createdAt">) => void;
}

export function CreateTaskModal({
  isOpen,
  onClose,
  onCreateTask,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");

  const handleCreate = () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!dueDate) {
      toast.error("Due date is required");
      return;
    }
    if (!dueTime) {
      toast.error("Due time is required");
      return;
    }

    onCreateTask({
      title,
      description,
      status: "todo",
      priority,
      dueDate,
      dueTime,
      completed: false,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setDueTime("");
    setPriority("medium");
    onClose();

    toast.success("Task created successfully");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-clash">
            <Image
              src="https://res.cloudinary.com/dohpngcuj/image/upload/v1774854604/Frame_13_ia8cqi.png"
              alt="task"
              width={35}
              height={35}
            />
            Create Task
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-900 font-clash">
              Title
            </label>
            <Input
              placeholder="e.g., Revamp Dashboard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-300 mt-1 h-11"
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-900 font-clash">
              Description
            </label>
            <Textarea
              placeholder="Describe detail your project"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-gray-300 h-40 resize-none overflow-y-auto mt-1"
              rows={10}
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-900 font-clash flex items-center gap-2">
              Due Date
            </label>

            <div className="flex items-center gap-3">
              <Image
                src="https://res.cloudinary.com/dohpngcuj/image/upload/v1774816225/Frame_2_qqkebp.png"
                alt="calendar"
                width={25}
                height={25}
                className="w-8 h-8 flex-shrink-0"
              />
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="h-11 mt-1 border-gray-300 flex-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-900 font-clash">
                Priority
              </label>
              <div className="flex items-center gap-3">
                <Image
                  src="https://res.cloudinary.com/dohpngcuj/image/upload/v1774854604/Frame_14_ynrgjg.png"
                  alt="priority"
                  width={40}
                  height={40}
                  className="w-10 h-10 flex-shrink-0"
                />
                <Select
                  value={priority}
                  onValueChange={(value) => setPriority(value as TaskPriority)}
                >
                  <SelectTrigger className="mt-1 border-gray-300 flex-1">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent className="p-2">
                    <SelectItem
                      value="high"
                      className="cursor-pointer mb-1.5 rounded-lg"
                    >
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-100 text-red-700 rounded-md w-full transition-colors">
                        <Zap className="w-4 h-4 text-red-500" />
                        <span className="font-semibold text-xs">High</span>
                      </div>
                    </SelectItem>

                    <SelectItem
                      value="medium"
                      className="cursor-pointer mb-1.5 rounded-lg"
                    >
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-100 text-yellow-700 rounded-md w-full transition-colors">
                        <EqualApproximately className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-xs">Medium</span>
                      </div>
                    </SelectItem>

                    <SelectItem
                      value="low"
                      className="cursor-pointer rounded-lg"
                    >
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-700 rounded-md w-full transition-colors">
                        <ChevronDown className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold text-xs">Low</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-lg font-clash font-medium text-gray-900">
                Due Time
              </label>
              <div className="flex items-center gap-3">
                <Image
                  src="https://res.cloudinary.com/dohpngcuj/image/upload/v1774854604/Frame_12_quptle.png"
                  alt="time"
                  width={40}
                  height={40}
                  className="w-10 h-10 flex-shrink-0"
                />
                <Input
                  type="time"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  className="h-11 mt-1 border-gray-300 flex-1 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 font-clash text-lg ">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 py-6 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            className="flex-1 bg-gray-900 hover:bg-gray-800 py-6 cursor-pointer"
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
