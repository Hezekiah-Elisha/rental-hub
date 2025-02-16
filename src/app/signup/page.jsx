"use client";

import { useActionState, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { signup } from "@/app/actions/auth";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, isPending] = useActionState(signup, undefined);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex flex-col justify-center align-middle items-center gap-2 mx-auto w-full md:w-1/2">
        <div className="w-full px-4 md:px-20 py-10">
          <h1 className="text-3xl">sign up with us</h1>
          <span className="text-sm">
            Already have an account?{" "}
            <a href="/signin" className="text-white underline">
              Sign Up
            </a>
          </span>
        </div>
        <form
          // onSubmit={handleSubmit}
          action={action}
          className="flex flex-col justify-center align-middle gap-4 w-full px-4 md:px-20"
        >
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            placeholder="Full name"
            id="name"
            name="name"
            // onChange={handleChange}
            className="w-full p-5 rounded-full outline-none placeholder:text-gray-900 dark:placeholder:text-blue-50 bg-blue-100 dark:bg-slate-200/20"
          />
          {state?.errors?.name && <p>{state.errors.name}</p>}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            // onChange={handleChange}
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
            disabled={isPending}
            className="w-full clear-start p-5 bg-blue-900 dark:bg-blue-800 rounded-full text-white uppercase"
          >
            {isPending ? "Loading..." : "Sign up"}
          </button>
        </form>
      </div>
      <div className="hidden md:flex justify-center align-middle items-center w-1/2 bg-blue-100 dark:bg-blue-800">
        <h2 className="text-3xl">Rental hub</h2>
      </div>
    </div>
  );
}
