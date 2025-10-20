"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Hash,
  HomeIcon,
  ListCheckIcon,
  PencilIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const SidebarNavigation = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`hidden sm:flex flex-col ${
        isOpen ? "w-[240px]" : "w-[64px]"
      } h-full min-h-screen border-r border-neutral-200`}
    >
      <div
        className={`w-full h-fit ${
          isOpen ? "p-4" : "px-2 py-4"
        } border-b border-neutral-200 flex items-center justify-between transition-all ease-in-out duration-300`}
      >
        {isOpen ? (
          <>
            <p className="text-base font-bold">Clarity Task List</p>
            <ChevronLeftIcon
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
              size={16}
            />
          </>
        ) : (
          <>
            <p className="text-base font-bold">CT</p>
            <ChevronRightIcon
              onClick={() => setIsOpen(true)}
              size={16}
              className="cursor-pointer"
            />
          </>
        )}
      </div>
      <div
        className={`w-full h-full flex-1 flex flex-col items-center py-4 ${
          isOpen ? "px-4" : "px-2"
        }`}
      >
        <div
          className={`w-full py-2 flex items-center gap-2 ${
            isOpen ? "justify-start" : "justify-center"
          }`}
        >
          <Link href={"/dashboard/home"}>
            <HomeIcon className="hover:text-neutral-400" size={16} />
          </Link>
          {isOpen && (
            <Link
              href={"/dashboard/home"}
              className="text-sm font-medium hover:text-neutral-400"
            >
              Home
            </Link>
          )}
        </div>
        <div
          className={`w-full py-2 flex items-center gap-2 ${
            isOpen ? "justify-start" : "justify-center"
          }`}
        >
          <Link href={"/dashboard/list/1"}>
            <PencilIcon className="hover:text-neutral-400" size={16} />
          </Link>
          {isOpen && (
            <Link
              href={"/dashboard/list/new"}
              className="text-sm font-medium hover:text-neutral-400"
            >
              Create Task List
            </Link>
          )}
        </div>
        <div
          className={`w-full flex flex-col gap-2 ${
            isOpen ? "justify-start" : "justify-center"
          }`}
        >
          <div
            className={`w-full h-full py-2 flex items-center gap-2 ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <ListCheckIcon className="hover:text-neutral-400" size={16} />

            {isOpen && (
              <p className="text-sm font-medium hover:text-neutral-400">
                My Task Lists
              </p>
            )}
          </div>
          <div
            className={` ${
              isOpen ? "flex" : "hidden"
            } flex-col ml-2 px-4 border-l border-neutral-400`}
          >
            <div
              className={`w-full py-2 flex items-center gap-2 ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Link href={"/dashboard/list/1"}>
                <Hash className="hover:text-neutral-400" size={14} />
              </Link>
              {isOpen && (
                <Link
                  href={"/dashboard/list/new"}
                  className="text-sm font-medium hover:text-neutral-400"
                >
                  Task Title
                </Link>
              )}
            </div>
            <div
              className={`w-full py-2 flex items-center gap-2 ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Link href={"/dashboard/list/1"}>
                <Hash className="hover:text-neutral-400" size={14} />
              </Link>
              {isOpen && (
                <Link
                  href={"/dashboard/list/new"}
                  className="text-sm font-medium hover:text-neutral-400"
                >
                  Task Title
                </Link>
              )}
            </div>
            <div
              className={`w-full py-2 flex items-center gap-2 ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <Link href={"/dashboard/list/1"}>
                <Hash className="hover:text-neutral-400" size={14} />
              </Link>
              {isOpen && (
                <Link
                  href={"/dashboard/list/new"}
                  className="text-sm font-medium hover:text-neutral-400"
                >
                  Task Title
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex h-fit py-4 ${
          isOpen ? "px-4 justify-start" : "px-2 justify-center"
        } border-t border-neutral-200 items-center gap-2`}
      >
        <div className="size-[32px] bg-neutral-400 rounded-full"></div>
        {isOpen && (
          <div className="text-sm font-medium hover:text-neutral-400">
            User Name
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarNavigation;
