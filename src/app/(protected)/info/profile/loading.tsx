import React from "react";

const ProfileLoading = () => {
  return (
    <div className="flex flex-col gap-3 items-start justify-start mb-10 animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-2/5"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>

      <div className="border rounded-lg p-5 flex flex-col items-start md:flex-row md:items-center justify-between gap-3 mt-10 w-full animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="flex flex-col items-start lg:flex-row md:items-center justify-between gap-4">
          <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg">
            <div className="bg-gray-200 w-full h-full"></div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
              <div className="h-10 bg-gray-200 rounded w-10 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="text-gray-500 w-[200px] text-xs sm:text-sm md:text-sm lg:text-base h-4 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="rounded-md bg-gray-200 animate-pulse w-full mt-5">
        <div className="flex items-start justify-center p-6 rounded-lg w-full">
          <div className="w-full space-y-4">
            <div className="w-full flex flex-col md:flex-row items-start justify-between h-6 bg-gray-400 rounded"></div>
            <div className="w-full flex flex-col md:flex-row items-start justify-between h-6 bg-gray-400 rounded"></div>
            <div className="w-full flex flex-col md:flex-row items-start justify-between h-6 bg-gray-400 rounded"></div>
          </div>
        </div>

        <div className="mt-10 ">
          <div className="border-t border-gray-400"></div>
          <div className="flex flex-col-reverse md:flex-row items-end justify-end gap-4 w-full p-5">
            <div className="w-full md:w-20 h-10 bg-gray-400 rounded"></div>
            <div className="bg-primary text-white px-4 py-2 rounded-md  w-full md:w-20 h-10  "></div>
          </div>
        </div>
      </div>

      <div className="w-full bg-red-50 p-6 rounded-lg shadow-md border border-red-300 shadow-red-50 mt-10  animate-pulse">
        <div className="flex items-center gap-3 mb-5 h-6"></div>
        <p className="text-sm text-gray-600 mb-6 h-6"></p>
        <div className="flex items-center gap-2 h-10"></div>
      </div>
    </div>
  );
};

export default ProfileLoading;
