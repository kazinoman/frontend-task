"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the structure of your link data
interface Link {
  id: number;
  created_at: string;
  providers: string;
  link: string;
  user_id: string;
}

// Define the context type
interface LinkContextType {
  savedLinks: Link[] | null;
  loading: boolean;
  setSavedLinks: React.Dispatch<React.SetStateAction<Link[] | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create a context with the default value
const LinkContext = createContext<LinkContextType | undefined>(undefined);

export const useLinkContext = () => {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error("useLinkContext must be used within a LinkProvider");
  }
  return context;
};

// Create a provider component
export const LinkProvider = ({ children }: { children: ReactNode }) => {
  const [savedLinks, setSavedLinks] = useState<Link[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <LinkContext.Provider value={{ savedLinks, setSavedLinks, loading, setLoading }}>{children}</LinkContext.Provider>
  );
};
