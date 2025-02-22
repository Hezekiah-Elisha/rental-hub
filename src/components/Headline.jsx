import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Headline({ title, link, linkText }) {
  return (
    <div className="flex flex-row justify-between align-middle items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Link href={link} className="">
        <Button>{linkText}</Button>
      </Link>
    </div>
  );
}
