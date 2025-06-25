"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { instance } from "@/api";
import { Input } from "./ui/input";
import Link from "next/link";

export default function Hero() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await instance.get("/categories");
    setCategories(response.data);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="flex flex-col gap-4 justify-center items-center bg-[url('/cate.jpg')] bg-cover bg-center text-center py-24 w-full h-full">
      <h1 className="text-4xl font-bold">Find Your Dream Home</h1>
      <form
        action=""
        className="flex flex-col lg:flex-row gap-2 md:gap-0 justify-center container w-full backdrop:blur-lg bg-gray-500 bg-opacity-50 p-10 rounded-lg"
      >
        <Input type="text" placeholder="Location" className="bg-background" />
        <Select
          className="w-full bg-background"
          name="category_id"
          id="category_id"
        >
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Select a House" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>House Category</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Maximum Rent"
          className="bg-background"
          min={0}
        />
        <Input
          type="text"
          placeholder="Special Condition"
          className="bg-background"
        />
        <Button type="submit" className="px-4 py-2 h-full">
          Search
        </Button>
      </form>
      <p className="underline text-sm text-slate-400">
        Photo by{" "}
        <Link
          href="https://unsplash.com/@k_zaidova?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          target="_blank"
        >
          Catherine Zaidova
        </Link>{" "}
        on{" "}
        <a
          href="https://unsplash.com/photos/a-view-of-the-ocean-from-a-high-rise-building-IQKFgfiWzfg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          target="_blank"
        >
          Unsplash
        </a>
      </p>
    </div>
  );
}
