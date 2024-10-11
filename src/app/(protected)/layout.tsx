import { redirect } from "next/navigation";

import { createClient } from "../../utils/server";

export default async function ProtectedPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/");
  }
  return <section>{children}</section>;
}
