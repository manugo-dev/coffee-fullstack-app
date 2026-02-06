import { NextConfig } from "next";

export default {
  sassOptions: {
    prependData: `@use "@/shared/styles/mixins" as *;`,
  },
} satisfies NextConfig;
