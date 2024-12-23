"use client";
import { useActionState } from "react";
import { createCategory } from "@/app/actions/category";

export default function page() {
  const [state, action, isPending] = useActionState(createCategory, undefined);
  return (
    <div>
      <form action={action} className="flex flex-col gap-4 align-middle justify-center items-center w-full">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          className="px-5 py-2 bg-slate-400 rounded-full"
        />
        {state?.errors?.name && <p>{state.errors.name}</p>}
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          className="px-5 py-2 bg-slate-400 rounded-full"
        />
        {state?.errors?.description && <p>{state.errors.description}</p>}
        <button
          type="submit"
          className="bg-blue-500 rounded-full px-4 py-2 text-white"
        >
          {isPending ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
