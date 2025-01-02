import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

export default function CategoryPill({ category }) {
  return (
    <div className="fex flex-row justify-start align-middle items-center w-full">
      <div className="flex flex-row rounded-full gap-2 text-white bg-blue-500 px-2 py-1 capitalize">
        <StarIcon className="size-5 text-yellow-500" />
        {category}
      </div>
    </div>
  );
}
