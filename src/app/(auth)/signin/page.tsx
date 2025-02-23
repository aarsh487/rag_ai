"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { CiLinkedin, CiMail } from "react-icons/ci";
import { SlSocialGoogle } from "react-icons/sl";
import appLogo1 from "/public/images/appLogo1.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleSignup = async () => {
    try {
      console.log("requeset sent:", form);
      const response = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });
      if (response?.error) {
        console.log(Error);
        return;
      }
      if (response?.url) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto flex flex-col justify-center items-center py-20">
      <div className="flex gap-4">
        <div className="px-10 pb-8 pt-2 shadow-md shadow-red-500 border-b-2 border-r-2 border-white/10 dark:drop-shadow-[0_0_15px_rgba(214,62,62,0.5)] rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <Image src={appLogo1} alt="logo" width={100} height={100} />
            <h1 className="text-xl font-semibold ">Create Your Account</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
              }}
              className="w-72"
            >
              <div className="mt-8">
                <Input
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
                />
              </div>
              <div className="mt-8">
                <Input
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Password"
                />
              </div>
              <div className="mt-4">
                <Button
                  className="hover:border hover:border-primary"
                  size="lg"
                  type="submit"
                >
                  sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <SlSocialGoogle size={25} />
          <CiLinkedin size={25} />
          <CiMail size={25} />
        </div>
      </div>
    </div>
  );
}
