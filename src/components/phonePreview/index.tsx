"use client";

import React from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaDev,
  FaFreeCodeCamp,
} from "react-icons/fa";

import Image from "next/image";
import { useLinkContext } from "@/context/LinkListContextProvider";

const PhonePreview = () => {
  const { savedLinks } = useLinkContext();

  const providerStyles = {
    google: { bgColor: "#4285F4", icon: <FaGoogle /> },
    facebook: { bgColor: "#3b5998", icon: <FaFacebookF /> },
    instagram: { bgColor: "#E4405F", icon: <FaInstagram /> },
    youtube: { bgColor: "#FF0000", icon: <FaYoutube /> },
    twitter: { bgColor: "#1DA1F2", icon: <FaTwitter /> },
    github: { bgColor: "#333", icon: <FaGithub /> },
    linkedin: { bgColor: "#0077B5", icon: <FaLinkedin /> },
    devto: { bgColor: "#0A0A0A", icon: <FaDev /> },
    freecodecamp: { bgColor: "#006400", icon: <FaFreeCodeCamp /> },
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <Image src={"/phone_skeleton.svg"} alt="phone_skeleton" width={350} height={350} className="z-0" />
      <div className="absolute inset-12 flex flex-col items-center justify-start text-center z-10">
        <h2 className="text-3xl font-bold ">My Information</h2>
        <p className="text-lg e">Name: John Doe</p>
        <p className="text-lg t">Age: 30</p>
        <p className="text-lg ">Occupation: Software Engineer</p>
        <div className="flex flex-col items-start justify-start gap-5  md:w-[100%] lg:w-[80%] h-[680px] overflow-auto mt-5 py-5">
          {savedLinks &&
            savedLinks.map((link) => {
              // Get the style for the current provider
              const { bgColor, icon } = providerStyles[link.providers as keyof typeof providerStyles] || {};

              return (
                <div
                  key={link.id}
                  className="p-1 rounded-lg shadow-md w-full h-12 flex items-center justify-start pl-5"
                  style={{ backgroundColor: bgColor || "#f0f0f0" }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{icon}</div>
                    <div>
                      <h3 className="text-white font-bold">{link.providers}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
