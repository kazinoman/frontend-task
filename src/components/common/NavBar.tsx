"use client";

import Image from "next/image";
import React from "react";
import { IoIosLink } from "react-icons/io";
import { MdRemoveRedEye } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  console.log(isDesktopOrLaptop, isBigScreen, isTabletOrMobile, isMobile);

  return (
    <nav className="bg-white p-4 rounded-2xl flex items-center justify-between sticky top-0 z-20">
      {isMobile ? (
        <Image src="/logo-devlinks-small.svg" alt="logo" width={150} height={150} className="w-10 h-10" />
      ) : (
        <Image src="/logo-devlinks-large.svg" alt="logo" width={150} height={150} />
      )}

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
        className="border border-primary px-4 py-2 rounded-md font-medium text-lg text-primary"
        onClick={() => router.push("/preview")}
      >
        {isMobile ? <MdRemoveRedEye className="w-5 h-5 md:mr-2" /> : <span className="font-bold text-lg">Preview</span>}
      </button>
    </nav>
  );
}
