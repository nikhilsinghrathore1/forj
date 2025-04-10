import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    domains:["block.github.io"]
  },
  "compilerOptions": {
    "suppressImplicitAnyIndexErrors": true,

    "noImplicitAny": false
  }
};

export default nextConfig;
