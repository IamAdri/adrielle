/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ydghorluedeqhuwnokqn.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/heels/**",
      },
      {
        protocol: "https",
        hostname: "ydghorluedeqhuwnokqn.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/flats/**",
      },
      {
        protocol: "https",
        hostname: "ydghorluedeqhuwnokqn.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/sandals/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
