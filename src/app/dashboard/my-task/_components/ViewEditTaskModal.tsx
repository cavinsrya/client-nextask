"use client";

import { useState, useEffect } from "react";
import * as React from "react";
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
import { ChevronDown, EqualApproximately, Zap } from "lucide-react";

interface ViewEditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onUpdateTask: (task: Task) => void;
}

export function ViewEditTaskModal({
  isOpen,
  onClose,
  task,
  onUpdateTask,
}: ViewEditTaskModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");

  React.useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
      setDueTime(task.dueTime);
      setPriority(task.priority);
      setIsEditing(false);
    }
  }, [task, isOpen]);

  if (!task) return null;

  const handleSave = () => {
    onUpdateTask({
      ...task,
      title,
      description,
      dueDate,
      dueTime,
      priority,
    });
    setIsEditing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white p-6 rounded-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3 text-2xl font-clash">
              <Image
                src="https://res.cloudinary.com/dohpngcuj/image/upload/v1774854604/Frame_13_ia8cqi.png"
                alt="task"
                width={35}
                height={35}
              />
              {isEditing ? "Edit Task" : "View Task"}
            </DialogTitle>
            {!isEditing && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-9 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-semibold text-gray-700"
              >
                Edit Task
              </Button>
            )}
          </div>
          <DialogDescription className="sr-only">
            {isEditing ? "Edit task details" : "View and edit task information"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-900 font-clash">
              Title
            </label>
            <Input
              disabled={!isEditing}
              placeholder="e.g., Revamp Dashboard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 mt-1 border-gray-300 rounded-lg disabled:bg-gray-50 disabled:opacity-100 disabled:text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-900 font-clash">
              Description
            </label>
            <Textarea
              disabled={!isEditing}
              placeholder="Describe detail your project"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-32 mt-1 resize-none overflow-y-auto border-gray-300 rounded-lg p-3 disabled:bg-gray-50 disabled:opacity-100 disabled:text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-900 font-clash">
              Due Date
            </label>
            <div className="flex items-center gap-3 mt-1">
              <Image
                src="https://res.cloudinary.com/dohpngcuj/image/upload/v1774816225/Frame_2_qqkebp.png"
                alt="calendar"
                width={40}
                height={40}
                className="w-10 h-10 flex-shrink-0"
              />
              <Input
                disabled={!isEditing}
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="h-11 border-gray-300 rounded-lg flex-1 disabled:bg-gray-50 disabled:opacity-100 disabled:text-gray-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-900 font-clash">
                Priority
              </label>
              <div className="flex items-center gap-3 mt-1">
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
                  disabled={!isEditing}
                >
                  <SelectTrigger className="border-gray-300 rounded-lg flex-1 disabled:bg-gray-50 disabled:opacity-100 disabled:text-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="p-2">
                    <SelectItem
                      value="high"
                      className="cursor-pointer mb-1.5 rounded-lg"
                    >
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-100 text-red-700 rounded-md w-full transition-colors">
                        <Zap className="w-4 h-4 text-red-500" />
                        <span className="font-semibold text-sm">High</span>
                      </div>
                    </SelectItem>

                    <SelectItem
                      value="medium"
                      className="cursor-pointer mb-1.5 rounded-lg"
                    >
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-100 text-yellow-700 rounded-md w-full transition-colors">
                        <EqualApproximately className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-sm">Medium</span>
                      </div>
                    </SelectItem>

                    <SelectItem
                      value="low"
                      className="cursor-pointer rounded-lg"
                    >
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-700 rounded-md w-full transition-colors">
                        <ChevronDown className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold text-sm">Low</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-900 font-clash">
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
                  disabled={!isEditing}
                  type="time"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  className="h-11 mt-1 border-gray-300 rounded-lg flex-1 disabled:bg-gray-50 disabled:opacity-100 disabled:text-gray-800 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="flex-1 h-11 rounded-lg font-semibold text-base cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 h-11 rounded-lg font-semibold text-base bg-gray-900 hover:bg-gray-800 text-white cursor-pointer"
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              onClick={onClose}
              className="w-full h-11 rounded-lg font-semibold text-base bg-gray-900 hover:bg-gray-800 text-white cursor-pointer"
            >
              Close
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
