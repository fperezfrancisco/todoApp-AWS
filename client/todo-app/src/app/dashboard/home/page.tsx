import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <div className="w-full p-4 py-8 max-w-[900px] mx-auto my-0 h-full">
        <h1 className="text-lg font-semibold mb-4">
          Welcome to your Dashboard Home
        </h1>
        <div className="w-full border border-neutral-200 h-[400px]"></div>
      </div>
    </div>
  );
};

export default page;
