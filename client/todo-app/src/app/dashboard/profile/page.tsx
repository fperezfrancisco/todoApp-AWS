"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { data: session } = useSession();
  if (!session?.user) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-base">You must be logged in to view this page.</p>
      </div>
    );
  }

  const { id, email, name, image } = session.user as {
    id: string;
    email: string;
    name: string;
    image: string;
  };

  console.log(image);

  const handleLogoutEverywhere = () => {
    window.location.href = "/api/auth/auth0-logout";
  };

  return (
    <div className="w-full h-screen overflow-y-auto">
      <div className="w-full p-4 py-8 max-w-[900px] mx-auto my-0 h-full">
        <h1 className="text-lg font-semibold mb-4">User Profile</h1>
        <div className="w-full flex items-start gap-8 pb-8 border-b border-neutral-200">
          <div className="size-[200px] bg-neutral-400 rounded-full">
            {image && (
              <Image
                src={image}
                alt="Profile Picture"
                className="w-full h-full object-cover rounded-full"
                width={200}
                height={200}
              />
            )}
          </div>
          <div className="flex-1 flex flex-wrap w-full gap-8">
            <div className="flex flex-1 flex-col items-start">
              <p className="text-xl font-medium">{name}</p>
              <div className="flex items-center gap-2">
                <p className="text-base">Email: </p>
                <p className="text-base text-neutral-400 truncate">{email}</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 items-start">
              <button
                onClick={handleLogoutEverywhere}
                className="px-6 py-2 border border-neutral-200 text-sm flex items-center justify-center rounded-md w-full min-w-[160px] max-w-[250px] hover:bg-neutral-200 hover:text-black cursor-pointer"
              >
                Logout
              </button>
              <button className="px-6 py-2 border border-neutral-200 text-sm flex items-center justify-center rounded-md w-full min-w-[160px] max-w-[250px] hover:bg-neutral-200 hover:text-black cursor-pointer">
                Edit Profile
              </button>
              <button className="px-6 py-2 border border-neutral-200 text-sm flex items-center justify-center rounded-md w-full min-w-[160px] max-w-[250px] hover:bg-neutral-200 hover:text-black cursor-pointer">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
