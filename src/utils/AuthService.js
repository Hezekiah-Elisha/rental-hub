import axios from "axios";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { instance } from "../api";
import { encrypt, decrypt } from "@/app/lib/sessions";
// import { cookies } from "next/headers";

class AuthService {
  constructor() {
    this.API_URL = process.env.API_URL;
  }

  async saveCookies(res) {
    // export async function createSession(userId) {
    //   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    //   const session = await encrypt({ userId, expiresAt });
    //   const cookieStore = await cookies();

    //   cookieStore.set("session", session, {
    //     httpOnly: true,
    //     secure: true,
    //     expires: expiresAt,
    //     sameSite: "lax",
    //     path: "/",
    //   });
    // }
    try {
      // Store tokens in cookies (secure HttpOnly cookies are recommended)
      setCookie("access_token", res.data.access_token, {
        req: null,
        res: null,
        maxAge: 60 * 60 * 24, // 24 hours
      });

      setCookie("refresh_token", res.data.refresh_token, {
        req: null,
        res: null,
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return res.data;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  }

  logout() {
    // Remove tokens from cookies
    deleteCookie("access_token");
    deleteCookie("refresh_token");
  }

  getAccessToken() {
    const access_token = getCookie("access_token");
    return access_token;
  }

  getRefreshToken() {
    return getCookie("refresh_token");
  }

  async refreshToken() {
    try {
      const refreshToken = this.getRefreshToken();

      const response = await axios.post(`${this.API_URL}/refresh`, {
        refresh_token: refreshToken,
      });

      // Update tokens
      setCookie("access_token", response.data.access_token, {
        req: null,
        res: null,
        maxAge: 60 * 60,
      });

      return response.data.access_token;
    } catch (error) {
      // If refresh fails, logout the user
      this.logout();
      throw error;
    }
  }

  // Create an axios instance with interceptors for automatic token refresh
  createAuthenticatedAxios() {
    instance.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newAccessToken = await this.refreshToken();

            // Retry the original request with new token
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          } catch (refreshError) {
            // Refresh token failed, logout user
            this.logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
