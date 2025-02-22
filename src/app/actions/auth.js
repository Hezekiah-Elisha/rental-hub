// "use server";
import { SignupFormSchema, SigninFormSchema } from "@/app/lib/definitions";
import { instance } from "@/api";
import { redirect } from "next/navigation";
import { createCookie, deleteAllCookies } from "../lib/session";

// import { deleteSession } from '@/app/lib/session'
// import { createSession } from "@/app/lib/session";

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
  const { name, email, password } = validatedFields.data;
  const response = await instance.post("/users/auth/register", {
    name: name,
    email: email,
    password: password,
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
  //validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validatedFields.data;

  const response = await instance
    .post("/auth/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      createCookie("access_token", response.data.access_token);
      createCookie("refresh_token", response.data.refresh_token);
      createCookie("user", response.data.user);
      // redirect("/dashboard");
      return response;
    })
    .catch((error) => {
      // console.log(error);
      return {
        errors: {
          email: "Invalid email or password",
        },
      };
    });
    if (response.status === 200){
      redirect("/dashboard");
    }
  // redirect("/dashboard");
}

export async function logout() {
  deleteAllCookies();
}

export async function getUser() {
  const response = await instance.get("/auth/user");
  return response.data;
}

export async function getAccessToken() {}
