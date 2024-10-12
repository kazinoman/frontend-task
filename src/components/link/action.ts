"use server";

import { Links } from "@/type/custom";
import { TablesInsert } from "@/type/supabase";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";

export async function addLink(link: Links) {
  const supabase = createClient();

  // get user Info
  const {
    data: { user: userData },
  } = await supabase.auth.getUser();

  if (!userData || !userData) {
    throw new Error("User not found");
  }

  //   link.user_id = userData.user.id;

  const { data, error } = await supabase
    .from("link_info")
    .insert({ ...link, user_id: userData.id })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/info/links");
}

export async function deleteLink(id: number | string) {
  const supabase = createClient();

  // get user Info
  const {
    data: { user: userData },
  } = await supabase.auth.getUser();

  if (!userData || !userData) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase.from("link_info").delete().match({ id });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/info/links");
}
