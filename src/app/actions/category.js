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
    .then((cookie) => {
      return cookie;
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

  console.log(validatedFields.data);
  console.log(cookie.mySession);
  

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
