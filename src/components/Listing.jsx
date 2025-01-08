import { BookmarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Listing() {
  return (
    <Link
      href="/listing/23"
      className="flex flex-col gap-2 w-full p-4 rounded-lg dark:hover:bg-blue-950 hover:bg-blue-50"
    >
      <Image
        src="/cate.jpg"
        alt="Catherine Zaidova"
        width={900}
        height={900}
        className="size-96 w-full object-cover rounded-lg"
      />
      <h3 className="text-xl">House in the Woods</h3>
      <p className="text-slate-400">3 Bedrooms, 2 Bathrooms</p>
      <p className="text-slate-400">Location: California</p>
      <div className="flex flex-row justify-between align-middle items-center w-full">
        <button className="bg-blue-500 text-white px-4 py-2">View</button>
        <BookmarkIcon className="size-6 text-blue-500" />
      </div>
    </Link>
  );
}
