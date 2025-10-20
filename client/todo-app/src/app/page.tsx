"use client";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    signIn("auth0", { redirect: true, callbackUrl: "/dashboard/home" });
  };

  const handleSignup = async () => {
    await signOut({ redirect: false, callbackUrl: "/api/auth/signout" });
    signIn("auth0", {
      redirect: true,
      callbackUrl: "/dashboard/home",
      screen_hint: "signup",
    });
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to the Todo App</h1>
      <div className="flex items-center justify-center gap-4 w-full mt-8">
        <button
          onClick={handleLogin}
          className="px-8 py-2 max-w-[200px] w-full rounded-md border border-neutral-200 text-base font-medium hover:bg-neutral-100 hover:shadow-md hover:text-black transition"
        >
          Login
        </button>
        <button
          onClick={handleSignup}
          className="px-8 py-2 max-w-[200px] w-full rounded-md border border-neutral-200 text-base font-medium hover:bg-neutral-100 hover:shadow-md hover:text-black transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
