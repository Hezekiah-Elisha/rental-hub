"use client";
import { useActionState } from "react";
import { createCategory } from "@/app/actions/category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [state, action, isPending] = useActionState(createCategory, undefined);
  return (
    <div>
      <form
        action={action}
        className="flex flex-col gap-4 align-middle justify-center items-startr w-full md:w-1/2"
      >
        <label htmlFor="name">Name of Category</label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          className=""
        />
        {state?.errors?.name && <p>{state.errors.name}</p>}
        <label htmlFor="description">Description</label>
        <Input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          className=""
        />
        {state?.errors?.description && <p>{state.errors.description}</p>}
        <Button type="submit" className="">
          {isPending ? "Creating..." : "Create"}
        </Button>
      </form>
    </div>
  );
}
