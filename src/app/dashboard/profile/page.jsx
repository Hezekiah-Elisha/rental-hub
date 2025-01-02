"use client";
import { useEffect, useState } from "react";
import { instance } from "@/api";
import { getSession } from "@/app/lib/session";

export default function DashboardProfile() {
  const [profile, setProfile] = useState({});
  const accessToken = getSession().then((session) => {
    return session.mySession.access_token;
  });


  useEffect(() => {
    const getProfile = async () => {
      await instance
        .get("/users/auth/user", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
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
  }, []);
  return <div>{profile.id}</div>;
}
