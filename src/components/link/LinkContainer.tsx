"use client";

import React, { useState } from "react";
import { Divider, Form, Input, Select } from "antd";
import { FaFacebookF, FaGithub, FaGoogle, FaInstagram, FaLinkedin, FaPlus, FaTwitter, FaYoutube } from "react-icons/fa";
import { SiDevdotto, SiFreecodecamp } from "react-icons/si";
import { FiLink } from "react-icons/fi";
import Image from "next/image";
import type { FormProps } from "antd";
import { Links } from "@/type/custom";
import { useLinkContext } from "@/context/LinkListContextProvider";
import useToastMessage from "@/hooks/useToastMessageHook";
import SingleLink from "./SingleLink";
import { addLink } from "./action";
import { AiFillDelete } from "react-icons/ai";

interface LinkContainerProps {
  links: Links[];
  userId: string;
}

type FieldType = {
  providers: string;
  link: string;
};

const LinkContainer: React.FC<LinkContainerProps> = ({ links, userId }) => {
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [nextId, setNextId] = useState(1);

  const { setSavedLinks, setLoading } = useLinkContext();
  const { showMessage, hideLoading, contextHolder } = useToastMessage();
  const [form] = Form.useForm();
  const provider = Form.useWatch("providers", form);

  const handleAddLinkClick = () => {
    // Mark that a link is being added
    setIsAddingLink((isAddingLink) => !isAddingLink);
  };

  const generateUniqueId = (): number => {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 10000); // Random number between 0 and 9999

    // Combine timestamp and random number into a single unique number
    return timestamp * 10000 + randomNum;
  };

  // Options for providers
  const options = [
    { value: "google", label: "Google", icon: <FaGoogle />, domain: "google.com" },
    { value: "facebook", label: "Facebook", icon: <FaFacebookF />, domain: "facebook.com" },
    { value: "instagram", label: "Instagram", icon: <FaInstagram />, domain: "instagram.com" },
    { value: "youtube", label: "Youtube", icon: <FaYoutube />, domain: "youtube.com" },
    { value: "twitter", label: "Twitter", icon: <FaTwitter />, domain: "x.com" },
    { value: "github", label: "Github", icon: <FaGithub />, domain: "github.com" },
    { value: "linkedin", label: "Linkedin", icon: <FaLinkedin />, domain: "linkedin.com" },
    { value: "devto", label: "Dev.to", icon: <SiDevdotto />, domain: "dev.to" },
    { value: "freecodecamp", label: "freeCodeCamp", icon: <SiFreecodecamp />, domain: "freecodecamp.org" },
  ];

  // URL validation function based on the selected provider
  const validateURL = async (_: any, value: string) => {
    if (!value) return Promise.resolve();

    const selectedOption = options.find((option) => option.value === provider);
    if (selectedOption && !value.includes(selectedOption.domain)) {
      return Promise.reject(new Error(`Please enter a valid link !!`));
    }

    return Promise.resolve();
  };

  // this will trigger form onSubmit and as well as onFinish
  const handleFormSubmit = () => {
    form.submit();
  };

  const addNewLink: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const linkData = {
        id: generateUniqueId(),
        created_at: new Date().toISOString(),
        link: values.link,
        providers: values.providers,
        user_id: userId,
      };

      // Show loading message
      showMessage("loading", "Uploading data...");

      //@ts-ignore
      // API call to add link
      await addLink(linkData);

      // Hide the loading message
      hideLoading();

      showMessage("success", "Link added successfully!");

      // Perform additional actions after successful link addition
      handleAddLinkClick();
      form.resetFields();

      return true;
    } catch (error: unknown) {
      // Catch and handle errors
      if (error instanceof Error) {
        showMessage("error", error.message);
      } else {
        showMessage("error", "An unknown error occurred");
      }

      // Reset form even if there is an error
      form.resetFields();

      // Ensure loading message is hidden in case of error
      hideLoading();

      return false; // Return failure
    }
  };
  const addLinkForm = () => {
    return (
      <div className="w-full mt-5 p-5 bg-[#fafafa] rounded-2xl">
        <div className="flex flex-row justify-between items-center gap-3 my-3">
          <p className="font-bold text-base text-gray-500">Link #{nextId}</p>
          <button className="font-light text-base  bg-red-100 p-2 rounded-md" onClick={handleAddLinkClick}>
            <span className="text-red-500">
              <AiFillDelete className="w-5 h-5" />
            </span>
          </button>
        </div>

        <Form
          name="basic"
          layout="vertical"
          autoComplete="off"
          form={form}
          onFinish={addNewLink}
          action={handleFormSubmit}
        >
          <Form.Item
            label="Platform"
            name="providers"
            rules={[{ required: true, message: "Please input your providers!" }]}
          >
            <Select
              className="w-full h-12"
              options={options?.map((option, index) => ({
                ...option,
                label: (
                  <div key={index} className="flex justify-start items-center align-middle text-[#354764] gap-4">
                    {option.icon}
                    <span className="text-[#354764] text-base">{option.label}</span>
                  </div>
                ),
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Link"
            name="link"
            rules={[
              { required: true, message: "Please input your link!" },
              { validator: validateURL }, // Custom URL validation
            ]}
          >
            <Input className="w-full h-12 text-base" prefix={<FiLink className="mr-4" />} />
          </Form.Item>
        </Form>
      </div>
    );
  };

  if (links) {
    // @ts-ignore
    setSavedLinks(links);
  }

  const noLinksFound = () => {
    return (
      <div className="flex flex-col items-center justify-center gap-5 p-5 bg-[#fafafa] rounded-2xl mt-5 shadow-md">
        <Image src={"/no_links_found.svg"} alt="No links found" width={300} height={300} />

        <p className="text-3xl font-bold text-gray-900">Let's get you started</p>
        <p className="text-sm font-thin text-gray-900 text-center mx-40">
          Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them.
          We're here to help you share your profiles with everyone!
        </p>
      </div>
    );
  };

  return (
    <div className="p-0">
      <div className="text-start flex flex-col gap-2">
        <h2 className="text-base md:text-lg lg:text-lg xl:text-4xl  font-bold text-titleColor">Customize your links</h2>
        <p className="text-gray-500 font-light text-base">
          Add/edit/remove links below and then share all your profiles with the world!
        </p>

        <button
          className="mt-5 bg-white text-primary border-primary border px-4 py-4 rounded-md"
          onClick={handleAddLinkClick}
        >
          <div className="flex items-center justify-center gap-2">
            <FaPlus />
            Add New Link
          </div>
        </button>
      </div>

      {links.length === 0 && !isAddingLink ? (
        noLinksFound()
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 gap-5 max-h-[600px] overflow-y-auto">
            {isAddingLink && addLinkForm()}

            {links.map((link) => {
              return (
                <div key={link.id} className="col-span-1">
                  <SingleLink providers={link.providers} link={link.link} id={link.id} userId={userId} />
                </div>
              );
            })}
          </div>

          <Divider />

          <div className="flex items-center justify-end">
            <button onClick={handleFormSubmit} className=" bg-primary text-white px-4 py-2 rounded-md w-full md:w-20">
              Save
            </button>
          </div>
        </>
      )}

      {contextHolder}
    </div>
  );
};

export default LinkContainer;
