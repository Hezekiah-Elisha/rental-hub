import { SignupFormSchema } from "@/app/lib/definitions";
import { instance } from "@/api";
import { redirect } from "next/navigation";
import authServiceInstance from "@/utils/AuthService";

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

  if (response.status !== 201) {
    return {
      errors: {
        email: "Email already exists",
      },
    };
  }

  redirect("/signin");
}

export async function signin(state, formData) {
  const response = await instance.post("/users/auth/login", {
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (response.status !== 200) {
    return {
      errors: {
        email: "Invalid email or password",
      },
    };
  }
  const info = authServiceInstance.saveCookies(response);
  console.log("data"+info);

  // createSession(response.data.user.id);
  redirect("/dashboard");
}

export function isLoggedIn(){
  return authServiceInstance.getAccessToken() !== null;
}


export async function signout() {
  const response = await instance.post("/users/auth/logout");
  authServiceInstance.logout();
  redirect("/signin");
}

export async function getUser() {
  const response = await instance.get("/users/auth/user");
  return response.data;
}

export async function getAccessToken() {
  return authServiceInstance.getAccessToken();
}