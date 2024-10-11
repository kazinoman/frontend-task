import React from "react";
import { redirect } from "next/navigation";
import { logout } from "../../Service/auth/actions";

import { createClient } from "../../utils/server";

export default async function ProfilePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div>
      ProfilePage {data.user.email}
      <div>
        <form action={logout}>
          <button>Sign out</button>
        </form>
      </div>
    </div>
  );
}
