"use client";
import { useEffect, useState } from "react";
import { instance } from "@/api";
import { getCookie } from "@/app/lib/session";

export default function DashboardProfile() {
  const [profile, setProfile] = useState({});
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const cookie = await getCookie("access_token");
      setAccessToken(cookie?.value);
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      if (accessToken) {
        try {
          const response = await instance.get("/users/auth/user", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setProfile(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getProfile();
  }, [accessToken]);

  return <div>{profile.id}</div>;
}