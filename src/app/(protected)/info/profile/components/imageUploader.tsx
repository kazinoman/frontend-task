import React, { useState } from "react";

interface ProfileImageUploaderProps {
  imagePreview: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({ imagePreview, handleFileChange }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-start md:flex-row md:items-center justify-between gap-3  p-6 w-full">
      <span className="text-gray-500">Profile picture</span>

      <div className="flex  flex-col items-start lg:flex-row md:items-center justify-between gap-4">
        <div
          className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Preview */}
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              // className={`w-full h-full object-cover ${isHovered ? "opacity-40" : "opacity-100"} transition-opacity `}
              className={`w-full h-full object-cover 
                ${isHovered ? "opacity-40 scale-105" : "opacity-100 scale-100"} 
                transition-opacity transition-transform duration-300 ease-in-out`}
            />
          ) : (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}

          {/* Hover Overlay */}

          <label
            htmlFor="fileInput"
            className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center cursor-pointer"
          >
            <label htmlFor="fileInput" className="text-white cursor-pointer flex flex-col items-center justify-center">
              <svg
                className="w-10 h-10 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              + Change Image
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <span className="text-gray-500 w-[200px] text-xs sm:text-sm md:text-sm lg:text-base ">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </span>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
