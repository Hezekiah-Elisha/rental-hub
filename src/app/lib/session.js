"use server";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

export async function createCookie(key, value) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const cookieStore = await cookies();

  cookieStore.set(key, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function getAllCookies() {
  const cookieStore = await cookies();
  return cookieStore.getAll();
}

export async function getCookie(key) {
  const cookieStore = await cookies();
  return cookieStore.get(key);
}

export async function deleteCookie(key) {
  const cookieStore = await cookies();
  cookieStore.delete(key);
}

// export async function deleteAllCookies() {
//   (await cookies()).clear();
// }

export async function deleteAllCookies() {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();

  for (const cookie of allCookies) {
    cookieStore.delete(cookie.name);
  }
}

export async function hasCookie(key) {
  const cookieStore = await cookies();
  return cookieStore.has(key);
}
