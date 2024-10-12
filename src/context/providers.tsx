"use client";

import React from "react";
import { ProfileProvider } from "./profileInfoContextProvider";
import { LinkProvider } from "./LinkListContextProvider";

/**
 * Providers Component wraps all the necessary providers for the application.
 * It provides the context for User's profile information and links.
 * It should be used in the root of the app.
 *
 */

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProfileProvider>
      <LinkProvider>{children}</LinkProvider>
    </ProfileProvider>
  );
};

export default Providers;
