"use client";
import React, { useState } from "react";

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
  updateTaskList: (newList: string[]) => void;
  taskList: string[];
}) => {
  const handleDelete = () => {
    const newList = taskList.filter((t) => t !== task);
    updateTaskList(newList);
  };

  const [completed, setCompleted] = useState(false);

  return (
    <li className="w-full flex items-center gap-4 py-4">
      <input
        type="checkbox"
        className="w-[20px] h-[20px]"
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      <span
        className={`text-2xl medium ${
          completed ? "line-through text-neutral-400" : ""
        }`}
      >
        {task}
      </span>
    </li>
  );
};

const EditListContent = () => {
  return <div className="w-full flex flex-col items-start">Edit</div>;
};

const ListContent = () => {
  return (
    <div className="w-full flex flex-col items-start">
      <h2 className="w-full py-4 text-4xl font-medium">List Title Here</h2>
      <div className="w-full flex flex-1 items-center gap-2 overflow-x-auto">
        <TagBox tag="Tag 1" onDelete={() => {}} />
        <TagBox tag="Tag 2" onDelete={() => {}} />
        <TagBox tag="Tag 3" onDelete={() => {}} />
      </div>
      <ul className="pl-8 my-4 w-full flex flex-col items-start gap-0 list-disc text-2xl">
        <TaskLi
          task="Sample Task 1"
          taskList={["Sample Task 1", "Sample Task 2"]}
          updateTaskList={() => {}}
        />
        <TaskLi
          task="Sample Task 2"
          taskList={["Sample Task 1", "Sample Task 2"]}
          updateTaskList={() => {}}
        />
      </ul>
      <div className="w-full my-8 flex items-center gap-4">
        <button className="border border-neutral-200 text-sm flex flex-1 items-center justify-center rounded-md px-4 py-4 hover:bg-neutral-200 hover:text-black cursor-pointer">
          Mark Complete
        </button>
        <button className="border border-neutral-200 text-sm flex flex-1 items-center justify-center rounded-md px-4 py-4 hover:bg-neutral-200 hover:text-black cursor-pointer">
          Archive
        </button>
      </div>
    </div>
  );
};

const page = (props: Props) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="w-full h-screen overflow-y-auto">
      <div className="w-full p-4 py-8 max-w-[900px] mx-auto my-0 h-full">
        <div className="w-full flex items-center justify-between gap-4">
          <h1 className="text-lg font-semibold mb-4">Task List</h1>
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 rounded-md border border-neutral-200 flex items-center justify-center text-xs hover:bg-neutral-100 hover:shadow-md hover:text-black transition"
          >
            Edit List
          </button>
        </div>
        {editMode ? <EditListContent /> : <ListContent />}
      </div>
    </div>
  );
};

export default page;
