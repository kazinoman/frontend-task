import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "../../../../utils/server";
import ProfileUpdateForm from "./components/profileForm";

export default async function ProfilePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/");
  }
  const userId = data.user.id;

  let { data: profile, error: getProfileError } = await supabase.from("profile").select("*").eq("id", userId);
  const userProfileData = profile && profile.length > 0 ? profile[0] : undefined;

  return (
    <div className="p-0">
      <div className="flex flex-col gap-3 items-start justify-start mb-10">
        <h2 className="text-base md:text-lg lg:text-lg xl:text-4xl  font-bold text-titleColor">Profile Details</h2>
        <p className="text-[#737373] font-light text-base">
          Add your details to create a personal touch to your profile.
        </p>
      </div>

      <ProfileUpdateForm userId={data.user.id} profileData={userProfileData} />
    </div>
  );
}

{
  /* ProfilePage {data.user.email} */
}

// <div>
//   <form action={logout}>
//     <button>Sign out</button>
//   </form>
// </div>
