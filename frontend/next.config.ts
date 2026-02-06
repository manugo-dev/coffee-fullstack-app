import { NextConfig } from "next";

export default {
  output: "standalone",
  sassOptions: {
    prependData: `@use "@/shared/styles/mixins" as *;`,
  },
} satisfies NextConfig;
