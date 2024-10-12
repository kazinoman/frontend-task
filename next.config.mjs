/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "picvvaxkyaknirqzkacy.supabase.co",
        hostname: "gqebdbfceekxsfjhslrh.supabase.co",
      },
    ],
  },
};

export default nextConfig;
