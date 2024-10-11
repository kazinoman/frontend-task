import { Database } from "./supabase";

export type Links = Database["public"]["Tables"]["link_info"]["Row"];

export type TablesInsert = Database["public"]["Tables"]["link_info"]["Insert"];
