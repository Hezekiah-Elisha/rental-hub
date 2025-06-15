"use server"
import { PropertyFormSchema } from "../lib/definitions";
import { instance } from "@/api";
import { redirect } from "next/navigation";
import { getCookie } from "../lib/session";

export async function createProperty(state, formData) {
  //validate form fields
  const validatedFields = PropertyFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    category_id: formData.get("category_id"),
    features: formData.get("features"),
    location: formData.get("location"),
    price: parseInt(formData.get("price")),
    image: formData.get("image"),
    tags: formData.get("tags"),
    user_id: user.id,
  });

  console.log(validatedFields);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

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

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${access_token.value}`,
    },
  };

  // call the create property API
  const response = await instance.post(
    "/listings",
    validatedFields.data,
    config
  );

  if (response.status !== 201) {
    return {
      errors: {
        name: "Property name already exists",
      },
    };
  }

  redirect("/dashboard/properties");
}
