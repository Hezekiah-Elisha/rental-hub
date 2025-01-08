import React from "react";

export default function Hero() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center bg-[url('/cate.jpg')] bg-cover bg-center text-white text-center py-24 w-full h-full">
      <h1 className="text-4xl font-bold text-black">Find Your Dream Home</h1>
      <form
        action=""
        className="flex flex-col lg:flex-row gap-2 md:gap-0 justify-center container w-full backdrop:blur-lg bg-black bg-opacity-50 p-10 rounded-lg"
      >
        <input
          type="text"
          placeholder="Location"
          className="p-2 h-10 focus:outline-none"
        />
        <input
          type="text"
          placeholder="House Type"
          className="p-2 h-10 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Maximum Rent"
          className="p-2 h-10 focus:outline-none"
          min={0}
        />
        <input
          type="text"
          placeholder="Special Condition"
          className="p-2 h-10 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Minimum Bedrooms"
          className="p-2 h-10 focus:outline-none"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Search
        </button>
      </form>
      <p className="underline text-sm text-slate-400">
        Photo by{" "}
        <a href="https://unsplash.com/@k_zaidova?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Catherine Zaidova
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/photos/a-view-of-the-ocean-from-a-high-rise-building-IQKFgfiWzfg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Unsplash
        </a>
      </p>
    </div>
  );
}
