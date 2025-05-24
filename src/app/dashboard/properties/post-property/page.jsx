"use client";
import { instance } from "@/api";
import { createProperty } from "@/app/actions/property";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function PostProperty() {
  const [state, action, isPending] = useActionState(createProperty, undefined);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  if (state?.success) {
    toast.success("Property posted successfully!");
    setTimeout(() => {
      window.location.href = "/dashboard/properties";
    }, 2000);
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const newTags = inputValue
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setTags([...tags, ...newTags]);
    setInputValue("");
  };

  const handleTagRemove = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const getCategories = async () => {
    const response = await instance.get("/categories");
    setCategories(response.data);
  };
  useEffect(() => {
    setSelectedImage(null);
    if (state?.errors?.image) {
      setSelectedImage(null);
    }
    getCategories();
  }, [state]);

  return (
    <div>
      <form
        action={action}
        className="flex flex-col gap-4 justify-center align-middle w-full text-black dark:text-white"
        // encType="multipart/form-data"
      >
        <div className="flex flex-row justify-between align-middle gap-4">
          <div className="flex flex-col justify-center gap-4 w-1/2 text-black">
            <Label htmlFor="title" className="text-black dark:text-white">
              Title
            </Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="text-black dark:text-white"
            />
            {state?.errors?.title && <p>{state.errors.title}</p>}
            <Label htmlFor="description" className="text-black dark:text-white">
              Description
            </Label>
            <Input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              className=""
            />
            {state?.errors?.description && <p>{state.errors.description}</p>}
            <Label htmlFor="category" className="text-black dark:text-white">
              Choose Category
            </Label>

            <Select className="w-full" name="category_id" id="category_id">
              <SelectTrigger className="w-full">
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
            {state?.errors?.category_id && <p>{state.errors.category_id}</p>}
            <Label htmlFor="location" className="text-black dark:text-white">
              Location
            </Label>
            <Input
              type="text"
              id="location"
              name="location"
              placeholder="Location"
              className=""
            />
            {state?.errors?.location && <p>{state.errors.location}</p>}
            <Label htmlFor="price" className="text-black dark:text-white">
              Price
            </Label>
            <Input
              type="text"
              id="price"
              name="price"
              placeholder="Price"
              className=""
            />
            {state?.errors?.price && <p>{state.errors.price}</p>}

            <Label htmlFor="features" className="text-black dark:text-white">
              Features
            </Label>
            <Textarea
              name="features"
              id="features"
              cols="30"
              rows="10"
              placeholder="Features"
              className="text-black dark:text-white"
            ></Textarea>
            {state?.errors?.features && <p>{state.errors.features}</p>}
            <Label htmlFor="tags" className="text-black dark:text-white">
              Tags
            </Label>
            <Input
              type="text"
              name="tags"
              id="tags"
              placeholder="Tags"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className=""
            />
            <div className="flex flex-row gap-3">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full"
                >
                  {tag}
                  <Button
                    type="button"
                    className="px-2"
                    onClick={() => handleTagRemove(index)}
                  >
                    &times;
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2">
            <div>
              <Label htmlFor="image" className="text-black dark:text-white">
                Property Image
              </Label>
            </div>
            <Input
              type="file"
              name="image"
              id="image"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={handleImageChange}
            />
            {state?.errors?.image && <p>{state.errors.image}</p>}
            {selectedImage && (
              <div className="flex flex-col items-center">
                <Image
                  src={selectedImage}
                  alt="Selected"
                  className="size-full object-cover mt-4"
                  width={2000}
                  height={2000}
                />
                <Button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-full"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
        <Button type="submit" className="">
          {isPending ? "Loading..." : "Post Property for review"}
        </Button>
      </form>
    </div>
  );
}
