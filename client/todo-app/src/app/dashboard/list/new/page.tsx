"use client";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {};

type TagModalProps = {
  onClose: () => void;
  setNewTag: (tag: string) => void;
};

const TagModal = ({ onClose, setNewTag }: TagModalProps) => {
  const [tag, setTag] = useState("");

  return (
    <div className="fixed inset-0 w-screen h-screen z-50 bg-black/50 p-4 flex items-center justify-center">
      <div className="w-full h-fit max-w-[600px] bg-white dark:bg-[#121212] border border-neutral-200 rounded-md p-4 flex flex-col items-start gap-4">
        <h2 className="text-lg font-semibold">Create New Tag</h2>
        <div className="w-full relative">
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Add a tag..."
            className="rounded-md border border-neutral-400 p-4 w-full mb-4 text-lg font-medium"
          />
          <button
            onClick={() => {
              setNewTag(tag);
              setTag("");
            }}
            className="absolute h-[32px] top-4 right-4 px-8 border border-neutral-200 rounded-md text-sm text-neutral-400 hover:bg-white hover:text-black cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

const TagBox = ({ tag, onDelete }: { tag: string; onDelete: () => void }) => {
  return (
    <div className="px-4 py-2 rounded-md border border-neutral-400 text-xs text-neutral-400 flex items-center justify-center">
      {tag}
      <button
        onClick={onDelete}
        className="ml-2 text-sm text-red-500 hover:text-red-700"
      >
        x
      </button>
    </div>
  );
};

const TaskLi = ({
  task,
  updateTaskList,
  taskList,
}: {
  task: string;
  updateTaskList: (taskList: string[]) => void;
  taskList: string[];
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleUpdateTask = () => {
    const updatedTasks = taskList.map((t) => (t === task ? editedTask : t));
    updateTaskList(updatedTasks);
    setIsEditing(false);
  };

  const handleDeleteTask = () => {
    const updatedTasks = taskList.filter((t) => t !== task);
    updateTaskList(updatedTasks);
  };

  return (
    <li className="py-2 w-full relative">
      <div className="flex items-center justify-between w-full">
        {isEditing ? (
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            onBlur={handleUpdateTask}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdateTask();
              }
            }}
            className="border-b border-neutral-400 p-2 w-full text-2xl font-medium"
          />
        ) : (
          <p className="text-2xl font-medium">{task}</p>
        )}

        <MoreHorizontal
          onClick={() => setIsMenuOpen(true)}
          className="cursor-pointer hover:text-neutral-400"
          size={16}
        />
      </div>
      {isMenuOpen && (
        <div className="absolute rounded-2xl bottom-2 right-0 w-fit min-w-[200px] h-fit bg-neutral-200 dark:bg-neutral-900 p-2">
          <ul className="w-full flex flex-col">
            <li
              onClick={() => {
                setIsEditing(true);
                setIsMenuOpen(false);
              }}
              className="px-4 py-2 border-b border-neutral-400 text-xs cursor-pointer hover:bg-neutral-500"
            >
              Edit Task
            </li>
            <li
              onClick={() => {
                handleDeleteTask();
                setIsMenuOpen(false);
              }}
              className="px-4 py-2 text-xs border-b border-neutral-400 cursor-pointer hover:bg-neutral-500"
            >
              Delete Task
            </li>
            <li
              onClick={() => {
                setIsEditing(false);
                setIsMenuOpen(false);
              }}
              className="px-4 py-2 text-xs cursor-pointer hover:bg-neutral-500"
            >
              Cancel
            </li>
          </ul>
        </div>
      )}
    </li>
  );
};

const page = (props: Props) => {
  const [taskListName, setTaskListName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const handleDeleteTag = (tagToDelete: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prev) => [...prev, newTask]);
      setNewTask("");
    }
  };

  useEffect(() => {
    if (newTag) {
      setTags((prev) => [...prev, newTag]);
      setNewTag("");
      setIsTagModalOpen(false);
    }
  }, [newTag]);

  return (
    <div className="w-full h-screen overflow-y-auto">
      {isTagModalOpen && (
        <TagModal
          onClose={() => setIsTagModalOpen(false)}
          setNewTag={setNewTag}
        />
      )}
      <div className="w-full p-4 py-8 max-w-[900px] mx-auto my-0 h-full">
        <h1 className="text-lg font-semibold mb-4">Create Task List</h1>
        <div className="w-full flex flex-col items-start">
          <input
            type="text"
            value={taskListName}
            onChange={(e) => setTaskListName(e.target.value)}
            placeholder="Task List Name..."
            className="border-b border-neutral-400 p-2 w-full py-4 mb-4 text-4xl font-medium"
          />
          <div className="w-full flex gap-4 items-center mb-4">
            <button
              onClick={() => setIsTagModalOpen(true)}
              className="border border-neutral-200 text-sm flex items-center justify-center rounded-md px-4 py-2 hover:bg-neutral-200 hover:text-black cursor-pointer"
            >
              add tag
            </button>
            <div className="w-full flex flex-1 items-center gap-2 overflow-x-auto">
              {tags.map((tag, index) => (
                <TagBox
                  onDelete={() => handleDeleteTag(tag)}
                  key={index}
                  tag={tag}
                />
              ))}
            </div>
          </div>
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Add a task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="rounded-md border border-neutral-400 p-4 w-full mb-4 text-lg font-medium"
            />
            <button
              onClick={handleAddTask}
              className="absolute h-[32px] top-4 right-4 px-8 border border-neutral-200 rounded-md text-sm text-neutral-400 hover:bg-white hover:text-black cursor-pointer"
            >
              Add
            </button>
          </div>
          <ul className="pl-8 w-full flex flex-col items-start gap-0 list-disc text-2xl">
            {tasks.map((task, index) => (
              <TaskLi
                key={index}
                task={task}
                taskList={tasks}
                updateTaskList={setTasks}
              />
            ))}
          </ul>
          <div className="w-full my-8 flex items-center gap-4">
            <button className="border border-neutral-200 text-sm flex flex-1 items-center justify-center rounded-md px-4 py-4 hover:bg-neutral-200 hover:text-black cursor-pointer">
              Create Task List
            </button>
            <button className="border border-neutral-200 text-sm flex flex-1 items-center justify-center rounded-md px-4 py-4 hover:bg-neutral-200 hover:text-black cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
