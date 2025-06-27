"use server";
import { CategoryFormSchema } from "../lib/definitions";
import { instance } from "@/api";
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
  // console.log("Access Token:", access_token);
  // console.log("Validated Fields:", validatedFields);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,

      message: "Missing Fields. Failed to create category.",
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
      console.log("Category created successfully:", response.data);
      return {
        success: true,
        message: "Category created successfully",
      };
    })
    .catch((error) => {
      console.error("Error creating category:", error.response);
      return {
        errors: {
          success: false,
          name: "Category name already exists",
        },
      };
      // console.log(error.Authorization);
    });
}

export async function getCategories() {
  try {
    const response = await instance.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function deleteCategory(categoryId) {
  try {
    const access_token = await getCookie("access_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token.value}`,
      },
    };
    const response = await instance.delete(`/categories/${categoryId}`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error.response);
    return null;
  }
}
