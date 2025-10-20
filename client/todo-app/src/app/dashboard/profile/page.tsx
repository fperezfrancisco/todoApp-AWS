import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <div className="w-full p-4 py-8 max-w-[900px] mx-auto my-0 h-full">
        <h1 className="text-lg font-semibold mb-4">User Profile</h1>
        <div className="w-full flex items-start gap-8 pb-8 border-b border-neutral-200">
          <div className="size-[200px] bg-neutral-400 rounded-full"></div>
          <div className="flex-1 flex flex-wrap w-full gap-8">
            <div className="flex flex-1 flex-col items-start">
              <p className="text-base font-medium">Francisco Perez</p>
              <p className="text-base text-neutral-400">
                francisco.perez@example.com
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-4 items-start">
              <button className="px-6 py-2 border border-neutral-200 text-sm flex items-center justify-center rounded-md w-full min-w-[160px] max-w-[250px] hover:bg-neutral-200 hover:text-black cursor-pointer">
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
