"use client";

import { supabaseClientSide } from "@/utils/client2";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  image?: string | null;
}

interface ProfileContextType {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
  imagePreview: string | null;
  setImagePreview: (image: string | null) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    email: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     const user = await supabaseClientSide.auth.getUser();
  //     if (user.data?.user) {
  //       const { data, error } = await supabaseClientSide.from("users").select("*").eq("id", user.data.user.id).single();
  //       if (data) {
  //         setProfileData({
  //           first_name: data.first_name,
  //           last_name: data.last_name,
  //           email: data.email,
  //           image: data.avatar_url,
  //         });
  //       }
  //     }
  //   };

  //   getUserData();

  //   console.log("userData", profileData);
  // }, []);

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData, imagePreview, setImagePreview }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
