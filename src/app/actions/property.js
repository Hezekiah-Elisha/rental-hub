import { PropertyFormSchema } from "../lib/definitions";
import { instance } from "@/api";
import { redirect } from "next/navigation";

export async function createProperty(state, formData) {

  console.log(formData.get("image").name);

  //validate form fields
  const validatedFields = PropertyFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    category_id: formData.get("category_id"),
    location: formData.get("location"),
    price: parseInt(formData.get("price")),
    image: formData.get("image"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const cookie = await getSession();
  console.log(cookie.mySession.access_token);
  

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${state.auth.token}`,
    },
  };

  // call the create property API
  const response = await instance.post("/listings", {
    name: formData.get("name"),
    location: formData.get("location"),
    price: formData.get("price"),
    description: formData.get("description"),
  }, config);

  if (response.status !== 201) {
    return {
      errors: {
        name: "Property name already exists",
      },
    };
  }

  redirect("/dashboard/properties");
}
