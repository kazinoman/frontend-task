import LinkContainer from "@/components/link/LinkContainer";
import { createClient } from "@/utils/server";

export default async function LinksPage() {
  const supabase = createClient();

  const { data: userData, error: getUserError } = await supabase.auth.getUser();

  if (!userData || !userData.user) {
    throw new Error("User not found");
  }
  let { data: link_info, error } = await supabase.from("link_info").select("*").eq("user_id", userData.user.id);

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (link_info) {
    return <LinkContainer links={link_info} userId={userData.user.id} />;
  }
}
