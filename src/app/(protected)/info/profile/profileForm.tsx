"use client";

import React, { useEffect, useState } from "react";
import { supabaseClientSide } from "@/utils/client2";
import { useProfile } from "@/context/profileInfoContextProvider";
import { Divider, Form, Input } from "antd";
import ProfileImageUploader from "./imageUploader";
import { insertUserInfo, UpdateUserInfo } from "./action";
import useToastMessage from "@/hooks/useToastMessageHook";
import { logout } from "@/Service/auth/actions";
import { useLinkContext } from "@/context/LinkListContextProvider";
import { FaExclamationTriangle, FaTrashAlt } from "react-icons/fa";

// Type for Profile Data
interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  image: string | null;
}

interface CreateOrUpdateProfileProps {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  email: string | null; // Allow null values for email
  updated_at: string;
}

interface ProfileUpdateFormProps {
  userId?: string;
  profileData: CreateOrUpdateProfileProps | undefined;
}

const ProfileUpdateForm: React.FC<ProfileUpdateFormProps> = ({ profileData, userId }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const { showMessage, hideLoading, contextHolder } = useToastMessage();
  const { setImagePreview, imagePreview, setProfileData } = useProfile();
  const { setSavedLinks } = useLinkContext();

  // Watching form inputs for first_name, last_name, and email
  const firstName = Form.useWatch<string>("first_name", form);
  const lastName = Form.useWatch<string>("last_name", form);
  const email = Form.useWatch<string>("email", form);

  // Update profile context as user types
  useEffect(() => {
    if (firstName !== undefined) {
      // @ts-ignore
      setProfileData((prev: ProfileData) => ({
        ...prev, // @ts-ignore
        first_name: firstName || "",
      }));
    }
  }, [firstName]);

  useEffect(() => {
    if (lastName !== undefined) {
      // @ts-ignore
      setProfileData((prev: ProfileData) => ({
        ...prev, // @ts-ignore
        last_name: lastName || "",
      }));
    }
  }, [lastName, setProfileData]);

  useEffect(() => {
    if (email !== undefined) {
      // @ts-ignore
      setProfileData((prev: ProfileData) => ({
        ...prev, // @ts-ignore
        email: email || "",
      }));
    }
  }, [email, setProfileData]);

  useEffect(() => {
    profileData && setImagePreview(profileData?.avatar_url);
  }, []);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      // Create preview URL for the selected file
      if (selectedFile) {
        const previewUrl = URL.createObjectURL(selectedFile);
        setImagePreview(previewUrl);
      }
    }
  };

  // Upload image to Supabase
  const uploadImageToSupabase = async (): Promise<string | null | undefined> => {
    try {
      if (!file) {
        alert("Please select an image to upload");
        return null;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`; // Unique filename

      const { error, data } = await supabaseClientSide.storage.from("avatars").upload(`${fileName}`, file);

      const publicUrl = supabaseClientSide.storage.from("avatars").getPublicUrl(`${fileName}`).data.publicUrl;

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };

  const onFinish = async (values: any) => {
    showMessage("loading", "Uploading data...");

    let imageUrl: string | null | undefined = imagePreview; // Initialize with the imagePreview as the fallback

    if (file) {
      imageUrl = await uploadImageToSupabase();
    } else {
      imageUrl = imagePreview;
    }

    if (!profileData) {
      await insertUserInfo({
        id: userId,
        avatar_url: imageUrl || "",
        first_name: firstName || "",
        last_name: lastName || "",
        email: email || "",
        updated_at: new Date().toISOString(),
      });
    } else {
      // Update existing user profile if profileData exists
      await UpdateUserInfo({
        id: userId,
        avatar_url: imageUrl || profileData.avatar_url || "",
        first_name: firstName || profileData.first_name || "",
        last_name: lastName || profileData.last_name || "",
        email: email || profileData.email || "",
        updated_at: new Date().toISOString(),
      });
    }
    // Hide the loading message
    hideLoading();

    // If successful, show success message
    showMessage("success", profileData ? "Profile updated successfully!" : "Profile created successfully!");

    // Update profile context with the new image or existing one
    // @ts-ignore
    setProfileData((prev) => ({
      ...prev,
      image: imageUrl || prev?.image || "", // Fallback to previous image if imageUrl is undefined
    }));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.submit();
  };

  const signOut = () => {
    logout();
    setSavedLinks(null);
    setProfileData({ email: "", first_name: "", last_name: "", image: null });
    setImagePreview(null);
  };

  return (
    <div className="rounded-md  my-10">
      <div className="rounded-md bg-background1 my-10">
        <ProfileImageUploader imagePreview={imagePreview} handleFileChange={handleFileChange} />
      </div>

      {/* Profile form */}
      <div className="rounded-md ">
        <div className="flex items-start justify-center p-6 bg-background1 rounded-lg w-full">
          <Form
            form={form}
            layout="horizontal"
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="w-full space-y-4"
            initialValues={profileData ? { ...profileData } : {}}
          >
            <div className="w-full flex flex-col md:flex-row items-start justify-between">
              <span className="flex-1 text-text1">First Name*</span>
              <Form.Item
                name="first_name"
                rules={[{ required: true, message: "Please input your first name!" }]}
                className="m-0 p-0 md:flex-1 w-full"
              >
                <Input
                  placeholder="e.g. John"
                  className="h-11 focus:shadow-lg focus:shadow-primary/15 focus:border-primary border-gray-300 rounded-md outline-none transition-shadow"
                />
              </Form.Item>
            </div>

            <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between">
              <span className="flex-1 text-text1">Last Name*</span>
              <Form.Item
                name="last_name"
                rules={[{ required: true, message: "Please input your last name!" }]}
                className="m-0 p-0 md:flex-1 w-full"
              >
                <Input
                  placeholder="e.g. Appleseed"
                  className="h-11 focus:shadow-lg focus:shadow-primary/15 focus:border-primary border-gray-300 rounded-md outline-none transition-shadow"
                />
              </Form.Item>
            </div>

            <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between">
              <span className="flex-1 text-text1">Email*</span>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  },
                ]}
                className="m-0 p-0 md:flex-1 w-full"
              >
                <Input
                  placeholder="e.g. email@example.com"
                  className="h-11 focus:shadow-lg focus:shadow-primary/15 focus:border-primary border-gray-300 rounded-md outline-none transition-shadow"
                />
              </Form.Item>
            </div>
          </Form>
        </div>

        <div className="mt-10">
          <Divider />
          <div className="flex flex-col-reverse md:flex-row items-end justify-end gap-4 w-full">
            <form action={signOut} className="w-full md:w-20">
              <button className="border border-primary text-primary  px-1 py-[7px] rounded-md w-full md:w-20 whitespace-nowrap">
                Log Out
              </button>
            </form>
            <button onClick={handleFormSubmit} className="bg-primary text-white px-4 py-2 rounded-md  w-full md:w-20">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* danger zone */}
      <div>
        <div className="w-full bg-red-50 p-6 rounded-lg shadow-md border border-red-300 shadow-red-50 mt-10">
          {/* Danger Zone Header */}
          <div className="flex items-center gap-3 mb-5">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
          </div>
          {/* Description */}
          <p className="text-sm text-gray-600 mb-6">
            <strong className="text-red-600">Warning:</strong> Deleting your account is{" "}
            <span className="font-semibold text-red-500">permanent</span> and{" "}
            <span className="font-semibold text-red-500">cannot be undone</span>. You will lose all your data, and this
            action is irreversible. Please proceed with extreme caution.
          </p>

          {/* Under Construction Message */}
          <p className="text-sm text-gray-600 mb-6">
            <strong className="text-red-600">Note:</strong> This section is currently{" "}
            <span className="font-semibold text-red-500">under construction</span>. Please check back later for more
            updates.
          </p>

          {/* Delete Button */}
          <div className="flex items-center gap-2">
            <button className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-300 flex gap-2 items-center justify-center">
              <FaTrashAlt className="text-white" /> <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>

      {contextHolder}
    </div>
  );
};

export default ProfileUpdateForm;
