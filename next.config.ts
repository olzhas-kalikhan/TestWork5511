import type { NextConfig } from "next";

const sassOptions = {
  additionalData: `
    $var: red;
  `,
};

const nextConfig: NextConfig = {
  sassOptions,
  images: {
    remotePatterns: [
      {
        hostname: "openweathermap.org",
      },
    ],
  },
};

export default nextConfig;
