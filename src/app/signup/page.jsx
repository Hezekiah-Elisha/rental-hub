import React from "react";

export default function Signup() {
  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex flex-col justify-center align-middle items-center gap-2 mx-auto w-full md:w-1/2">
        <div className="w-full px-4 md:px-20 py-10">
          <h1 className="text-3xl">sign up with us</h1>
          <span className="text-sm">Already have an account? <a href="/signin" className="text-white underline">Sign in</a></span>
        </div>
        <form action="" className="flex flex-col justify-center align-middle gap-4 w-full px-4 md:px-20">
          <input type="text" placeholder="Username" className="w-full p-5 rounded-full outline-none placeholder:text-gray-900 dark:placeholder:text-blue-50 bg-blue-100 dark:bg-slate-200/20" />
          <input type="password" placeholder="Password" className="w-full p-5 rounded-full outline-none placeholder:text-gray-900 dark:placeholder:text-blue-50 bg-blue-100 dark:bg-slate-200/20" />
          <button type="submit" className="w-full clear-start p-5 bg-blue-900 dark:bg-blue-800 rounded-full text-white uppercase">Sign in</button>
        </form>
      </div>
      <div className="hidden md:flex justify-center align-middle items-center w-1/2 bg-blue-100 dark:bg-blue-800">
        <h2 className="text-3xl">Rental hub</h2>
      </div>
    </div>
  );
}
