import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../app/actions/firebase";
import { toast } from "sonner";
import { googleAuthenticate } from "@/app/actions/auth";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function GoogleAuth() {
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign-in successful:", result);
      const response = googleAuthenticate(
        result.user.displayName,
        result.user.email,
        result.user.photoURL
      ).then((res) => {
        if (res.success) {
          toast.success("Google sign-in successful!");
          // Redirect or perform any other action after successful sign-in
        } else {
          toast.error("Google sign-in failed: " + res.message);
        }
      });
    } catch (error) {
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
          <span className="text-foreground">Google</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Login with Google</p>
      </TooltipContent>
      {/* </Tooltip> */}
    </Tooltip>
  );
}
