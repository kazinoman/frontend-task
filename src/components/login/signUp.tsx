"use client";

import React from "react";
import { useRouter } from "next/navigation";

const SignUpLink = () => {
  const router = useRouter();

  return <span onClick={() => router.push("/signup")}>sign up</span>;
};

export default SignUpLink;
