"use server";
import { SignupFormSchema, SigninFormSchema } from "@/app/lib/definitions";
import { instance } from "@/api";
import { createCookie, deleteAllCookies } from "../lib/session";

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

  try {
    const response = await instance.post("/auth/login", {
      email,
      password,
    });
    await createCookie("access_token", response.data.access_token);
    await createCookie("refresh_token", response.data.refresh_token);
    await createCookie("user", JSON.stringify(response.data.user));
    await createCookie("photoURL", response.data.user.photoURL || "");
    return {
      success: true,
      status: response.status,
      message: "Login successful",
    };
  } catch (error) {
    return {
      errors: {
        email: "Invalid email or password",
      },
    };
  }
}

export async function googleAuthenticate(displayName, email, photoURL) {
  //make displayname a suitable username
  const username = displayName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  // const response = await instance.post("/auth/google", {
  //   username,
  //   email,
  //   password,
  // });
  // return response.data;
  try {
    const response = await instance.post("/auth/google_login", {
      username,
      email,
      photoURL,
    });
    await createCookie("access_token", response.data.access_token);
    await createCookie("refresh_token", response.data.refresh_token);
    await createCookie("user", JSON.stringify(response.data.user));
    await createCookie("photoURL", response.data.user.photoURL || "");
    return {
      success: true,
      message: "Google authentication successful",
      displayName,
      email,
      photoURL,
    };
  } catch (error) {
    console.error("Google authentication failed:", error);
    return {
      success: false,
      message: "Google authentication failed",
      error: error.message,
    };
  }
  // return {
  //   success: true,
  //   message: "Google authentication successful",
  //   displayName,
  //   email,
  //   photoURL,
  // };
}

export async function logout() {
  deleteAllCookies();
}

export async function getUser() {
  const response = await instance.get("/auth/user");
  return response.data;
}

export async function getAccessToken() {}
