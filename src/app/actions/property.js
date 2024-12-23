import { PropertyFormSchema } from "../lib/definitions";
import { instance } from "@/api";
import { redirect } from "next/navigation";

export async function createProperty(state, formData) {
  //validate form fields
  const validatedFields = PropertyFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    category_id: formData.get("category_id"),
    location: formData.get("location"),
    price: formData.get("price"),
    image: formData.get("image"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // call the create property API
  const response = await instance.post("/listings", {
    name: formData.get("name"),
    location: formData.get("location"),
    price: formData.get("price"),
    description: formData.get("description"),
  });

  if (response.status !== 201) {
    return {
      errors: {
        name: "Property name already exists",
      },
    };
  }

  redirect("/dashboard/properties");
}
