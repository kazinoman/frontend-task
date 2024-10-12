import { Database } from "./supabase";

export type Links = Database["public"]["Tables"]["link_info"]["Row"];

export type TablesInsert = Database["public"]["Tables"]["link_info"]["Insert"];

export type ProfileInsert = Database["public"]["Tables"]["profile"]["Insert"];

export type ProfileUpdate = Database["public"]["Tables"]["profile"]["Update"];

export type ProfileDataInsert = Database["public"]["Tables"]["profile"]["Row"];

export type Profile = ProfileDataInsert & {
  links: Links[];
};
