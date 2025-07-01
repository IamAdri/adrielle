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
    ],
  },
};

export default nextConfig;
