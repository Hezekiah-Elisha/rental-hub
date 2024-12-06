"use client";

import React from "react";
import { instance } from "../../api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function Signup() {
  const [formData, setFormData] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    instance
      .post("/users/auth/register", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex flex-col justify-center align-middle items-center gap-2 mx-auto w-full md:w-1/2">
        <div className="w-full px-4 md:px-20 py-10">
          <h1 className="text-3xl">sign up with us</h1>
          <span className="text-sm">
            Already have an account?{" "}
            <a href="/signin" className="text-white underline">
              Sign in
            </a>
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center align-middle gap-4 w-full px-4 md:px-20"
        >
          <input
            type="text"
            placeholder="Full name"
            name="name"
            onChange={handleChange}
            className="w-full p-5 rounded-full outline-none placeholder:text-gray-900 dark:placeholder:text-blue-50 bg-blue-100 dark:bg-slate-200/20"
          />
          <input
            type="email"
            placeholder="Username"
            name="email"
            onChange={handleChange}
            className="w-full p-5 rounded-full outline-none placeholder:text-gray-900 dark:placeholder:text-blue-50 bg-blue-100 dark:bg-slate-200/20"
          />
          <div className="relative flex flex-row w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              className="w-full p-5 rounded-full outline-none placeholder:text-gray-900 dark:placeholder:text-blue-50 bg-blue-100 dark:bg-slate-200/20"
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeSlashIcon className="size-6 text-blue-800"/> : <EyeIcon className="size-6 text-blue-800"/>}
            </button>
          </div>
          <button
            type="submit"
            className="w-full clear-start p-5 bg-blue-900 dark:bg-blue-800 rounded-full text-white uppercase"
          >
            Sign in
          </button>
        </form>
      </div>
      <div className="hidden md:flex justify-center align-middle items-center w-1/2 bg-blue-100 dark:bg-blue-800">
        <h2 className="text-3xl">Rental hub</h2>
      </div>
    </div>
  );
}
