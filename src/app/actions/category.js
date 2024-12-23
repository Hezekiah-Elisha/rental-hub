import { CategoryFormSchema } from "../lib/definitions";
import { instance } from "@/api";
import { redirect } from "next/navigation";
import { getAccessToken } from "./auth";

export async function createCategory(state, formData) {
  //validate form fields
  const validatedFields = CategoryFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  console.log(getAccessToken());

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  // call the create category API
  const response = await instance.post("/categories/", config, {
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (response.status !== 201) {
    return {
      errors: {
        name: "Category name already exists",
      },
    };
  }

  redirect("/dashboard/categories");
}
