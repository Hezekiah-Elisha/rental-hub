"use client";
import Headline from "@/components/Headline";
import { useEffect, useState } from "react";
import { instance } from "@/api";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    instance.get("/categories").then((response) => {
      setCategories(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <div>
      <Headline
        title="Categories"
        link="/dashboard/categories/create-category"
        linkText="Create Category"
      />
      <div className="flex flex-row justify-start align-middle p-4 flex-wrap gap-2">
        {categories.length === 0 ? (
          <div>No categories available.</div>
        ) : (
          categories.map((category) => (
            <Card key={category.id} className="w-1/4">
              <CardHeader>
                <CardTitle>House Name</CardTitle>
                <CardDescription>{category.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{category.description}</p>
              </CardContent>
              <CardFooter>
                <div className="w-full flex flex-row justify-start align-middle text-sm gap-2">
                  <TrashIcon className="size-4 hover:cursor-pointer" />
                  <PencilIcon className="size-4 hover:cursor-pointer" />
                </div>
              </CardFooter>
            </Card>

            // <div
            //   key={category.id}
            //   className="flex flex-col justify-between align-middle bg-blue-950 text-white p-2 rounded-lg w-1/4 gap-4"
            // >
            //   <h2 className="text-white text-2xl font-bold capitalize">
            //     {category.name}
            //   </h2>
            //   <p className="text-sm">{category.description}</p>
            //   <div className="flex flex-row justify-end align-middle">
            //     <div className="w-full flex flex-row justify-end align-middle text-sm gap-2">
            //       <TrashIcon className="size-4 text-red-400 hover:cursor-pointer" />
            //       <PencilIcon className="size-4 text-green-400 hover:cursor-pointer" />
            //     </div>
            //   </div>
            // </div>
          ))
        )}
      </div>
    </div>
  );
}
