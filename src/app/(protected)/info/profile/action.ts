"use server";

import { ProfileUpdate } from "@/type/custom";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";

export async function insertUserInfo(profile: ProfileUpdate) {
  const supabase = createClient();

  // get user Info
  const {
    data: { user: userData },
  } = await supabase.auth.getUser();

  if (!userData || !userData) {
    throw new Error("User not found");
  }

  console.log(userData);
  //   link.user_id = userData.user.id;

  const { data, error } = await supabase
    .from("profile")
    // @ts-ignore
    .insert({ ...profile, id: userData.id })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/info/profile");
}

export async function UpdateUserInfo(profile: ProfileUpdate) {
  const supabase = createClient();

  // get user Info
  const {
    data: { user: userData },
  } = await supabase.auth.getUser();

  if (!userData || !userData) {
    throw new Error("User not found");
  }

  console.log(profile, userData.id);
  //   link.user_id = userData.user.id;

  const { data, error } = await supabase.from("profile").update(profile).eq("id", userData.id).select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/info/profile");
}
