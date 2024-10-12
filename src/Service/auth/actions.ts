"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "../../utils/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/?error=invalid credentials");
  }

  revalidatePath("/", "layout");
  redirect("/info/links");
}

export async function signUp(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log(data);

  const { data: signUpData, error } = await supabase.auth.signUp(data);

  //   const { user, session, error } = await supabase.auth.signUp({
  //     email: 'test9879873456@test.com',
  //     password: '123456',
  // });

  if (error) {
    if (error.message.includes("User already registered")) {
      // Handle the case where the user already exists
      console.error("This email is already registered. Please log in instead.");
      // Optionally, redirect to the login page or show a message to the user
    } else {
      // Handle other errors
      console.error("Signup error:", error.message);
    }
  } else {
    console.log("User registered:", signUpData);
    // Continue with your logic after successful signup
  }

  revalidatePath("/", "layout");
  redirect("/info/links");
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
