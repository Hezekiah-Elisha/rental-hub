"use client";
import { instance } from "@/api";
import { createProperty } from "@/app/actions/property";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function PostProperty() {
  const [state, action, isPending] = useActionState(createProperty, undefined);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

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
  }, []);

  return (
    <div>
      <form
        action={action}
        className="flex flex-col gap-4 align-middle justify-center items-center"
        encType="multipart/form-data"
      >
        <div className="flex flex-row justify-between align-middle gap-4">
          <div className="flex flex-col justify-center gap-4 w-1/2 text-black">
            <label htmlFor="title" className="text-black dark:text-white">
              Title
            </label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className=""
            />
            {state?.errors?.title && <p>{state.errors.title}</p>}
            <label htmlFor="description" className="text-black dark:text-white">
              Description
            </label>
            <Input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              className=""
            />
            {state?.errors?.description && <p>{state.errors.description}</p>}
            <label htmlFor="category" className="text-black dark:text-white">
              Choose Category
            </label>

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
            <label htmlFor="location" className="text-black dark:text-white">
              Location
            </label>
            <Input
              type="text"
              id="location"
              name="location"
              placeholder="Location"
              className=""
            />
            {state?.errors?.location && <p>{state.errors.location}</p>}
            <label htmlFor="price" className="text-black dark:text-white">
              Price
            </label>
            <Input
              type="text"
              id="price"
              name="price"
              placeholder="Price"
              className=""
            />
            {state?.errors?.price && <p>{state.errors.price}</p>}

            <label htmlFor="features" className="text-black dark:text-white">
              Features
            </label>
            <Textarea
              name="features"
              id="features"
              cols="30"
              rows="10"
              placeholder="Features"
              className=""
            ></Textarea>
            {state?.errors?.features && <p>{state.errors.features}</p>}
            <label htmlFor="tags" className="text-black dark:text-white">
              Tags
            </label>
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
                  <button
                    type="button"
                    className="ml-2 text-white"
                    onClick={() => handleTagRemove(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2">
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
                  className="size-full object-cover mt-4 rounded-full"
                  width={2000}
                  height={2000}
                />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-full"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className=""
        >
          {isPending ? "Loading..." : "Post Property for review"}
        </Button>
      </form>
    </div>
  );
}
