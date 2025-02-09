"use client";
import { useEffect, useState } from "react";
import { instance } from "@/api";
import { getCookie } from "@/app/lib/session";

export default function DashboardProfile() {
  const [profile, setProfile] = useState({});
  const accessToken = getCookie("access_token").then((cookie) => {
    return cookie.value;
  });

  useEffect(() => {
    const getProfile = async () => {
      await instance
        .get("/users/auth/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setProfile(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getProfile();
  }, [accessToken]);
  return <div>{profile.id}</div>;
}
