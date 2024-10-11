"use client";

import Image from "next/image";
import React from "react";
import { IoIosLink } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  console.log("pathname", pathname);

  return (
    <nav className="bg-white p-8 rounded-2xl flex items-center justify-between">
      <Image src="/logo-devlinks-large.svg" alt="logo" width={150} height={150} />

      <div className="flex space-x-4">
        <button
          className={`${
            pathname === "/info/links" ? "bg-[#efebff] text-primary" : "text-gray-400"
          } flex items-center px-4 py-2 border rounded-md   font-medium text-lg  `}
          onClick={() => router.push("/info/links")}
        >
          <IoIosLink className={`w-5 h-5 mr-2  ${pathname === "/info/links" ? "text-primary" : "text-gray-400"} `} />
          Link
        </button>
        <button
          className={`${
            pathname === "/info/profile" ? "bg-[#efebff] text-primary" : "text-gray-400"
          } flex items-center px-4 py-2 border rounded-md   font-medium text-lg`}
          onClick={() => router.push("/info/profile")}
        >
          <MdOutlineAccountCircle
            className={`w-5 h-5 mr-2  ${pathname === "/info/profile" ? "text-primary" : "text-gray-400"}`}
          />
          Profile
        </button>
      </div>

      <button
        className="border border-primary px-4 py-2 rounded-md font-medium text-lg text-primary"
        onClick={() => router.push("/preview")}
      >
        Preview
      </button>
    </nav>
  );
}
