import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../app/actions/firebase";
import { toast } from "sonner";
import { googleAuthenticate } from "@/app/actions/auth";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { redirect } from "next/navigation";
import { set } from "zod";

export default function GoogleAuth() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // console.log("Google sign-in successful:", result);
      const response = googleAuthenticate(
        result.user.displayName,
        result.user.email,
        result.user.photoURL
      ).then((res) => {
        setLoading(false);
        if (res.success) {
          toast.success("Google sign-in successful!");
          // Redirect or perform any other action after successful sign-in
          redirect("/dashboard");
        } else {
          toast.error("Sign in failed, try using email and password.");
        }
      });
    } catch (error) {
      setLoading(false);
      // console.error("Error during Google sign-in:", error);
      toast.error("Error during Google sign-in:", error);
    }
  };
  return (
    <Tooltip className="w-full font-poppins text-sm">
      {/* <Tooltip> */}
      <TooltipTrigger>
        <Button
          className="w-full bg-secondary hover:bg-accent/90 hover:cursor-pointer"
          onClick={handleGoogleSignIn}
        >
          <Image
            src="/google-icon.svg"
            alt="Google Logo"
            width={20}
            height={20}
            className="inline-block mr-2"
          />
          <span className="text-foreground">
            {loading ? "Signing in with Google..." : "Google"}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Login with Google</p>
      </TooltipContent>
      {/* </Tooltip> */}
    </Tooltip>
  );
}
