import { CategoryFormSchema } from "../lib/definitions";
import { instance } from "@/api";
import { redirect } from "next/navigation";
import { getCookie } from "../lib/session";

export async function createCategory(state, formData) {
  //validate form fields
  const validatedFields = CategoryFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  const access_token = await getCookie("access_token")
    .then((access_token) => {
      return access_token;
    })
    .catch((error) => {
      return {
        errors: {
          name: "Invalid session",
        },
      };
    });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token.value}`,
    },
  };

  // call the create category API
  instance
    .post("/categories/", validatedFields.data, config)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.Authorization);
    });

  // if (response.status !== 201) {
  //   return {
  //     errors: {
  //       name: "Category name already exists",
  //     },
  //   };
  // }

  redirect("/dashboard/categories");
}
