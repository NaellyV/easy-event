import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withImages = require("next-images");
module.exports = withImages();

export default nextConfig;
