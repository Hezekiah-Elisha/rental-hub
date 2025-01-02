"use client";
import { instance } from "@/api";
import { createProperty } from "@/app/actions/property";
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
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="px-5 py-2 bg-slate-400 rounded-full placeholder:text-blue"
            />
            {state?.errors?.title && <p>{state.errors.title}</p>}
            <label htmlFor="description" className="text-black dark:text-white">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              className="px-5 py-2 bg-slate-400 rounded-full"
            />
            {state?.errors?.description && <p>{state.errors.description}</p>}
            <label htmlFor="category" className="text-black dark:text-white">
              Choose Category
            </label>
            <select
              name="category_id"
              id="category_id"
              className="px-5 py-2 bg-slate-400 rounded-full"
            >
              <option value="">House</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {state?.errors?.category_id && <p>{state.errors.category_id}</p>}
            <label htmlFor="location" className="text-black dark:text-white">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Location"
              className="px-5 py-2 bg-slate-400 rounded-full"
            />
            {state?.errors?.location && <p>{state.errors.location}</p>}
            <label htmlFor="price" className="text-black dark:text-white">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Price"
              className="px-5 py-2 bg-slate-400 rounded-full"
            />
            {state?.errors?.price && <p>{state.errors.price}</p>}

            <label htmlFor="features" className="text-black dark:text-white">
              Features
            </label>
            <textarea
              name="features"
              id="features"
              cols="30"
              rows="10"
              placeholder="Features"
              className="px-5 py-2 bg-slate-400 rounded-3xl"
            ></textarea>
            {state?.errors?.features && <p>{state.errors.features}</p>}
            <label htmlFor="tags" className="text-black dark:text-white">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="Tags"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="px-5 py-2 bg-slate-400 rounded-full"
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
            <input
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
        <button
          type="submit"
          className="px-5 py-2 bg-blue-950 text-white rounded-full"
        >
          {isPending ? "Loading..." : "Post Property for review"}
        </button>
      </form>
    </div>
  );
}
