// import { cookies } from "next/headers";
import { getCookie, deleteCookie, hasCookie, setCookie } from "cookies-next";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/dist/server/api-utils";

const secretKey = process.env.SESSION_SECRET || "secretstobekept";
console.log("Secret key: ", secretKey);
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  console.log("Encrypting session" + secretKey);
  // console.log("Encrypting session");
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

// export async function decrypt(session) {
//   try {
//     const { payload } = await jwtVerify(session, encodedKey, {
//       algorithms: ["HS256"],
//     });
//     return payload;
//   } catch (error) {
//     console.log("Failed to verify session");
//   }
// }

export async function decrypt(session) {
  // Ensure session is a string
  const token = typeof session === "string" ? session : String(session);

  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify session", error);
    throw error;
  }
}

export async function createCookie(key, value) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  setCookie(key, value, {
    httpOnly: false,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function logout() {
  await deleteAllCookies();
}

export async function deleteAllCookies() {
  deleteCookie("access_token");
  deleteCookie("refresh_token");
  deleteCookie("user");
}

export async function getSession() {
  const session = getCookie("session");
  if (!session) return null;
  return await decrypt(session);
}

export async function hasSession(req) {
  const exists = hasCookie("session");
  console.log("Session exists: ", exists);
  if (!exists) return false;
  return true;
}

// export async function updateSession(req) {
//   const session = req.cookies.get("session")?.value;
//   if (!session) return;

//   const payload = await decrypt(session);
//   payload.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
//   const res = await encrypt(payload);
//   req.cookies.set("session", res, {
//     expires: payload.expires,
//     httpOnly: true,
//   });

//   return res;
// }

export async function updateSession(request) {
  const session = getCookie("session");
  if (!session) return;

  const payload = await decrypt(session);
  payload.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const res = await encrypt(payload);
  req.cookies.set("session", res, {
    expires: payload.expires,
    httpOnly: true,
  });

  return res;
}