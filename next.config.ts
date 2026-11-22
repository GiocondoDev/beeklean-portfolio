import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Serve the generated HTML, CSS and JavaScript from a static host.
  trailingSlash: true,
};

export default nextConfig;
