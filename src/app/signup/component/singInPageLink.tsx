"use client";

import React from "react";
import { useRouter } from "next/navigation";

const SignInLink = () => {
  const router = useRouter();

  return <span onClick={() => router.push("/")}>sign in</span>;
};

export default SignInLink;
