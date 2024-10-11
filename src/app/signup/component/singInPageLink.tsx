"use client";

import React from "react";
import { useRouter } from "next/navigation";

const SignInLink = () => {
  const router = useRouter();

  return (
    <p className="text-center ">
      Already have an account? &nbsp;
      <span className="underline cursor-pointer text-primary" onClick={() => router.push("/")}>
        sign in
      </span>
    </p>
  );
};

export default SignInLink;
