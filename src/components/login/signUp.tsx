"use client";

import React from "react";
import { useRouter } from "next/navigation";

const SignUpLink = () => {
  const router = useRouter();

  return (
    <p className="text-center text-text1 text-sm">
      Don't have an account? &nbsp;
      <span className="underline cursor-pointer text-primary font-bold" onClick={() => router.push("/signup")}>
        sign up
      </span>
    </p>
  );
};

export default SignUpLink;
