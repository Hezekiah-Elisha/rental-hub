import { SignupFormSchema } from "@/app/lib/definitions";
import { instance } from "@/api";
import { redirect } from "next/navigation";
import { createSession } from "../lib/sessions";

export async function signup(state, formData) {
  //validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // call the signup API
  const response = await instance.post("/users/auth/register", {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  redirect("/signin");
}

export async function signin(state, formData) {
  const response = await instance.post("/users/auth/login", {
    email: formData.get("email"),
    password: formData.get("password"),
  });

  createSession(response.data.user.id);

  redirect("/dashboard");
}
