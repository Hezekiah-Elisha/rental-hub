import { BookmarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

export default function Listing() {
  return (
    <Link href="/listing/23" className="">
      <Card className="">
        <CardHeader>
          <Image
            src="/cate.jpg"
            alt="Catherine Zaidova"
            width={900}
            height={900}
            className="size-96 w-full object-cover rounded-lg"
          />
          <CardTitle>House in the Woods</CardTitle>
          <CardDescription className="text-slate-400">
            3 Bedrooms, 2 Bathrooms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400">Location: California</p>
        </CardContent>
        <CardFooter className="flex flex-row justify-between align-middle items-center w-full">
          <Button className="">View</Button>
          <BookmarkIcon className="size-6 " />
        </CardFooter>
      </Card>
    </Link>
  );
}
