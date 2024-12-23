import Link from "next/link";
import React from "react";

export default function Headline({ title, link, linkText }) {
  return (
    <div className="flex flex-row justify-between align-middle items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Link
        href={link}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {linkText}
      </Link>
    </div>
  );
}
