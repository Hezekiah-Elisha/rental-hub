"use client";
import { useState, useActionState, useEffect } from "react";
import { signin } from "@/app/actions/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import GoogleAuth from "@/components/GoogleAuth";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, isPending] = useActionState(
    signin,
    undefined,
    "/dashboard/home"
  );

  // is state has response of status 200, redirect to dashboard
  useEffect(() => {
    if (state?.success) {
      toast.success("Signin successful! Redirecting to dashboard...");
      redirect("/dashboard");
    }
  }, [state]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            height={870}
            width={870}
            alt=""
            src="/family.png"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40" />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <Link className="block text-primary" href="/">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
            <div className="flex flex-col gap-4">
              <h1 className="mt-6 text-2xl font-bold sm:text-3xl md:text-4xl">
                The Rental Hub Ke
              </h1>

              <p className="mt-4 leading-relaxed">
                We are happy to see you here. Please sign in to continue.
              </p>
              <GoogleAuth />
              <div className="flex flex-row items-center justify-center w-full gap-2 ">
                {/* <Separator className="w-[10px]" orientation="horizontal" /> */}
                <p className="text-center text-sm text-muted-foreground uppercase">
                  Or
                </p>
                {/* <Separator className="w-[10px]" orientation="horizontal" /> */}
              </div>

              <form action={action} className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="Email" className="block text-sm font-medium ">
                    Email
                  </label>

                  <Input type="email" id="Email" name="email" className="" />
                  <p className="text-red-300">
                    {state?.errors?.email && <p>{state.errors.email}</p>}
                  </p>
                </div>
                <div className="col-span-6">
                  <label htmlFor="Email" className="block text-sm font-medium ">
                    Password
                  </label>
                  <Input
                    type="password"
                    id="Password"
                    name="password"
                    className=""
                  />
                  <p className="text-red-300">
                    {state?.errors?.password && (
                      <div>
                        <p>Password must:</p>
                        <ul>
                          {state.errors.password.map((error) => (
                            <li key={error}>- {error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </p>
                </div>

                <p className="col-span-6 flex items-center justify-between">
                  {state?.errors?.root && <p>{state.errors.root}</p>}
                  <a href="#" className="">
                    Forgot your password?
                  </a>
                </p>

                <div className="col-span-6">
                  <p className="text-sm">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="underline">
                      {" "}
                      terms and conditions{" "}
                    </a>
                    and{" "}
                    <a href="#" className="underline">
                      privacy policy
                    </a>
                    .
                  </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <Button className="" disabled={isPending}>
                    {isPending ? "Loading..." : "Sign in"}
                  </Button>

                  <p className="mt-4 text-sm sm:mt-0">
                    Already have an account?{" "}
                    <Link href="/signup" className="underline">
                      Signup
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
