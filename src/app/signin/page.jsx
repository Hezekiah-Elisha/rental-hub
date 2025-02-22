"use client";
import { useState, useActionState } from "react";
import { signin } from "@/app/actions/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, isPending] = useActionState(
    signin,
    undefined,
    "/dashboard/home"
  );
  const { refreshToken } = useAuth();

  // is state has response of status 200, redirect to dashboard
  if (state?.status === 200) {
    redirect("/dashboard");
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex flex-col justify-center align-middle items-center gap-2 mx-auto w-full md:w-1/2 space-y-4">
        <div className="w-full px-4 md:px-20">
          <span className="text-3xl">Hello, We are happy to see you here</span>
        </div>
        <form
          action={action}
          className="flex flex-col justify-center align-middle gap-4 w-full px-4 md:px-20"
        >
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="email"
            id="email"
            name="email"
            className="w-full p-5 rounded-full outline-none placeholder:text-gray-900 dark:placeholder:text-blue-50 bg-blue-100 dark:bg-slate-200/20"
          />
          {state?.errors?.email && <p>{state.errors.email}</p>}
          <label htmlFor="password">Password</label>
          <div className="relative flex flex-row w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              name="password"
              // onChange={handleChange}
              className="w-full p-5 rounded-full outline-none placeholder:text-gray-900 dark:placeholder:text-blue-50 bg-blue-100 dark:bg-slate-200/20"
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeSlashIcon className="size-6 text-blue-800" />
              ) : (
                <EyeIcon className="size-6 text-blue-800" />
              )}
            </button>
          </div>
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            onClick={() => {
              refreshToken();
            }}
            className="w-full clear-start p-5 bg-blue-900 dark:bg-blue-800 rounded-full text-white uppercase"
          >
            {isPending ? "Loading..." : "Sign in"}
          </button>
          <div className="flex flex-col justify-end align-middle items-end w-full">
            <Link href="/signup" className="text-black dark:text-white">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
      <div className="relative hidden md:flex justify-center align-middle items-center w-1/2 bg-blue-100 dark:bg-blue-800">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="new.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 size-full flex flex-col justify-center items-center bg-blue-50/25">
          <h2 className="text-3xl text-white">Rental Hub</h2>
          <a href="https://www.pexels.com/video/a-close-up-of-a-book-with-a-pattern-of-squares-16655796/">
            Video by Pachon in Motion from Pexels
          </a>
        </div>
      </div>
    </div>
  );
}
