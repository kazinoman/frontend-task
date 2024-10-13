"use client";

import Image from "next/image";
import React from "react";
import { IoIosLink } from "react-icons/io";
import { MdRemoveRedEye } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="bg-white p-4 rounded-2xl flex items-center justify-between sticky top-0 z-20">
      <Image src="/logo-devlinks-small.svg" alt="logo" width={150} height={150} className="w-10 h-10 flex md:hidden" />
      <Image src="/logo-devlinks-large.svg" alt="logo" width={150} height={150} className="hidden md:flex" />

      <div className="flex space-x-4">
        <button
          className={`${
            pathname === "/info/links" ? "bg-[#efebff] text-primary" : "text-gray-400"
          } flex items-center px-4 py-2 border rounded-md   font-medium text-lg  `}
          onClick={() => router.push("/info/links")}
        >
          <IoIosLink className={`w-5 h-5 md:mr-2  ${pathname === "/info/links" ? "text-primary" : "text-gray-400"} `} />
          <span className="hidden md:block">Links</span>
        </button>
        <button
          className={`${
            pathname === "/info/profile" ? "bg-[#efebff] text-primary" : "text-gray-400"
          } flex items-center px-4 py-2 border rounded-md   font-medium text-lg`}
          onClick={() => router.push("/info/profile")}
        >
          <MdOutlineAccountCircle
            className={`w-5 h-5 md:mr-2  ${pathname === "/info/profile" ? "text-primary" : "text-gray-400"}`}
          />
          <span className="hidden md:block">Profile</span>
        </button>
      </div>

      <button
        className="border border-primary px-4 py-2 rounded-md font-medium text-lg text-primary flex gap-1 items-center"
        onClick={() => router.push("/preview")}
      >
        <MdRemoveRedEye className="w-5 h-5 md:mr-2" />
        <span className="font-bold text-lg hidden md:block">Preview</span>
      </button>
    </nav>
  );
}
