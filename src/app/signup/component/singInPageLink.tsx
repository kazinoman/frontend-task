"use client";

import React from "react";
import { useRouter } from "next/navigation";

const SignInLink = () => {
  const router = useRouter();

  return (
    <p className="text-center text-text1 text-sm">
      Already have an account? &nbsp;
      <span className="underline cursor-pointer text-primary font-bold" onClick={() => router.push("/")}>
        sign in
      </span>
    </p>
  );
};

export default SignInLink;
