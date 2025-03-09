import { BookmarkIcon } from "@heroicons/react/24/outline";
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

export default function Listing({ listing }) {
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
          <CardTitle>{listing.title}</CardTitle>
          <CardDescription className="">
            3 Bedrooms, 2 Bathrooms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="">Location: California</p>

          <p className="">Price: KES.{listing.price}</p>
        </CardContent>
        <CardFooter className="flex flex-row justify-between align-middle items-center w-full">
          <Button className="">View</Button>
          <BookmarkIcon className="size-6 text-primary" />
        </CardFooter>
      </Card>
    </Link>
  );
}
