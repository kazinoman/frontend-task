"use client";

import { useLinkContext } from "@/context/LinkListContextProvider";
import { useProfile } from "@/context/profileInfoContextProvider";
import useToastMessage from "@/hooks/useToastMessageHook";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import {
  FaDev,
  FaFacebookF,
  FaFreeCodeCamp,
  FaGithub,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function PreviewPage() {
  const { savedLinks } = useLinkContext();
  const { imagePreview, profileData } = useProfile();
  const { showMessage, contextHolder } = useToastMessage();
  const router = useRouter();

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

  // Function to handle the copy link clipboard action
  const handleCopy = (linkUrl: string, provider: string) => {
    navigator.clipboard
      .writeText(linkUrl)
      .then(() => {
        showMessage(`success`, `Copy the ${provider} link to clipboard`, 3);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div>
      <div className="h-[250px] bg-primary w-full rounded-bl-[40px] rounded-br-[40px] relative z-10">
        <div className="bg-background1 w-[98%] rounded-xl p-4 absolute top-14 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between">
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push("/info/links");
            }}
            className="border border-primary text-primary  px-1 py-[7px] rounded-md w-full md:w-32 whitespace-nowrap"
          >
            Back to Editor
          </button>
          <button className="bg-primary text-white px-6 py-2 rounded-md  w-full md:w-32">Share Link</button>
        </div>
        <div className="h-[500px] w-[300px] mt-[-30px] z-20 bg-background1 rounded-3xl border p-6 shadow-lg absolute top-[450px] left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="  gap-2 flex flex-col items-center justify-start text-center z-10">
            <div className="flex flex-col items-center justify-center gap-1">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="profile image"
                  width={120}
                  height={120}
                  quality={100}
                  className="border-4 border-primary h-[80px] w-[80px] rounded-full object-cover"
                />
              ) : (
                <div className="border h-[80px] w-[80px] border-[#f0f0f0] rounded-full bg-slate-200 "></div>
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

            <div className="flex flex-col items-start justify-start gap-5 w-full h-[320px] overflow-auto py-2">
              {savedLinks && savedLinks.length > 0
                ? savedLinks.map((link) => {
                    // Get the style for the current provider
                    const { bgColor, icon } = providerStyles[link.providers as keyof typeof providerStyles] || {};

                    return (
                      <div
                        key={link.id}
                        className="p-1 rounded-lg shadow-md w-full h-12 min-h-12 flex items-center justify-start pl-5"
                        style={{ backgroundColor: bgColor || "#f0f0f0" }}
                        onClick={() => handleCopy(link.link, link.providers)}
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
                : Array(4)
                    .fill(null)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="p-1  rounded-lg w-full h-12 min-h-12 flex items-center justify-start pl-5 bg-slate-200"
                      >
                        <div className="flex items-center gap-4"></div>
                      </div>
                    ))}
            </div>
          </div>
        </div>
      </div>

      {contextHolder}
    </div>
  );
}
