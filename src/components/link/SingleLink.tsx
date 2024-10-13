import { Input, Select } from "antd";
import React from "react";
import { FaGoogle, FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import useToastMessage from "@/hooks/useToastMessageHook";
import { deleteLink } from "./action";

interface Link {
  providers: string;
  link: string;
  id: number | string;
  userId: string;
}

const SingleLink: React.FC<Link> = ({ providers, link, id, userId }) => {
  const { showMessage, contextHolder, hideLoading } = useToastMessage();

  const options = [
    { value: "google", label: "Google", icon: <FaGoogle /> },
    { value: "facebook", label: "Facebook", icon: <FaFacebookF /> },
    { value: "instagram", label: "Instagram", icon: <FaInstagram /> },
    { value: "youtube", label: "Youtube", icon: <FaYoutube /> },
    { value: "twitter", label: "Twitter", icon: <FaTwitter /> },
    { value: "github", label: "Github", icon: <FaGithub /> },
    { value: "linkedin", label: "Linkedin", icon: <FaLinkedin /> },
  ];

  return (
    <div className="mt-5 p-5 bg-[#fafafa] rounded-2xl">
      <div className="flex flex-row justify-between items-center gap-3 my-3">
        <p className=" text-base text-gray-500 font-extrabold">Link #{id}</p>
        <button
          className="font-light text-base  bg-red-100 p-2 rounded-md"
          //   formAction={async () => {
          //     await deleteLink(id);
          //   }}
          onClick={async () => {
            showMessage("loading", "Deleting link data...");

            await deleteLink(id);
            hideLoading();

            showMessage("success", "Data deleted successfully!", 10);
          }}
        >
          <span className="text-red-500">
            <AiFillDelete className="w-5 h-5" />
          </span>
        </button>
      </div>

      <div className="w-full flex flex-col gap-3">
        <p className="text-sm font-normal">Platform</p>
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
          //   value={link}
          defaultValue={providers}
        />

        <p className="text-sm font-normal">Link</p>
        <Input
          placeholder=""
          value={link}
          className="w-full h-12 text-base"
          defaultValue={link}
          readOnly
          prefix={<FiLink className="mr-4" />}
        />
      </div>

      {contextHolder}
    </div>
  );
};

export default SingleLink;
