import React from "react";

export default function Signin() {
  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex flex-col justify-center align-middle items-center gap-2 mx-auto w-full md:w-1/2">
        <div className="w-full px-4 md:px-20">
          <span className="text-3xl">Hello, We are happy to see you here</span>
        </div>
        <form action="" className="flex flex-col justify-center align-middle gap-4 w-full px-4 md:px-20">
          <input type="text" placeholder="Username" className="w-full p-5 rounded-full outline-none placeholder:text-gray-900 dark:placeholder:text-blue-50 bg-blue-100 dark:bg-slate-200/20" />
          <input type="password" placeholder="Password" className="w-full p-5 rounded-full outline-none placeholder:text-gray-900 dark:placeholder:text-blue-50 bg-blue-100 dark:bg-slate-200/20" />
          <button type="submit" className="w-full clear-start p-5 bg-blue-950 rounded-full text-white uppercase">Sign in</button>
        </form>
      </div>
      <div className="hidden md:flex justify-center align-middle items-center w-1/2 bg-blue-100 dark:bg-blue-800">
        <h2 className="text-3xl">Rental hub</h2>
      </div>
    </div>
  );
}
