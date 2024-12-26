import { SignupFormSchema, SigninFormSchema } from "@/app/lib/definitions";
import { instance } from "@/api";
import { redirect } from "next/navigation";
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

  const response = await instance.post("/users/auth/login", {
    email: email,
    password: password,
  });

  if (response.status !== 200) {
    return {
      errors: {
        email: "Invalid email or password",
      },
    };
  }

  if (response.statusText === "Unauthorized") {
    return {
      errors: {
        email: "Invalid email or password",
      },
    };
  }

  if (response.statusText === "Internal Server Error") {
    return {
      errors: {
        email: "Internal Server Error",
      },
    };
  }

  if (response.statusText === "Bad Request") {
    return {
      errors: {
        email: "Bad Request",
      },
    };
  }

  if (!response.data) {
    return {
      errors: {
        email: "Invalid email or password",
      },
    };
  }

  // await createSession(response.data);

  // const info = await authServiceInstance.saveCookies(response);
  // console.log("data" + info);

  // // createSession(response.data.user.id);
  redirect("/dashboard");
}

export async function getUser() {
  const response = await instance.get("/users/auth/user");
  return response.data;
}

export async function getAccessToken() {
}
