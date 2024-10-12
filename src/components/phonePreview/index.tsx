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
import { useProfile } from "@/context/profileInfoContextProvider";

const PhonePreview = () => {
  const { savedLinks } = useLinkContext();
  const { imagePreview, profileData } = useProfile();

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
      <div className="flex flex-col gap-1 items-center justify-center "></div>
      <div className="absolute inset-12  gap-2 flex flex-col items-center justify-start text-center z-10">
        <div className="flex flex-col items-center justify-center gap-2">
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="profile image"
              width={120}
              height={120}
              quality={100}
              className="border-4 border-primary h-[120px] w-[120px] rounded-full object-cover"
            />
          ) : (
            <div className="border h-[120px] w-[120px] border-[#f0f0f0] rounded-full "></div>
          )}

          <span className="p-0 m-0 font-bold max-w-[310px]  mx-center overflow-hidden text-ellipsis whitespace-nowrap">
            {profileData.first_name || profileData.last_name ? (
              profileData.first_name + " " + profileData.last_name
            ) : (
              <div className="h-5 w-36 bg-slate-200 rounded-full"></div>
            )}
          </span>
          <span className="p-0 m-0 max-w-[250px]  mx-center overflow-hidden text-ellipsis whitespace-nowrap">
            {profileData.email || <div className="h-5 w-20 bg-slate-200 rounded-full"></div>}
          </span>
        </div>

        {/* <div className="flex flex-col items-start justify-start gap-5  md:w-[100%] lg:w-[80%] h-[650px] overflow-auto py-2">
          {savedLinks &&
            savedLinks.map((link) => {
              // Get the style for the current provider
              const { bgColor, icon } = providerStyles[link.providers as keyof typeof providerStyles] || {};

              return (
                <div
                  key={link.id}
                  className="p-1 rounded-lg shadow-md w-full h-12 min-h-12 flex items-center justify-start pl-5"
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
        </div> */}
        <div className="flex flex-col items-start justify-start gap-5  md:w-[100%] lg:w-[80%] h-[650px] overflow-auto py-2">
          {savedLinks && savedLinks.length > 0
            ? savedLinks.map((link) => {
                // Get the style for the current provider
                const { bgColor, icon } = providerStyles[link.providers as keyof typeof providerStyles] || {};

                return (
                  <div
                    key={link.id}
                    className="p-1 rounded-lg shadow-md w-full h-12 min-h-12 flex items-center justify-start pl-5"
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
              })
            : Array(6)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="p-1 rounded-lg  w-full h-12 min-h-12 flex items-center justify-start pl-5 bg-slate-200"
                  >
                    <div className="flex items-center gap-4"></div>
                  </div>
                ))}
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
