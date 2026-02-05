import { NextConfig } from "next";

export default {
  allowedDevOrigins: ["192.168.50.5"],
  sassOptions: {
    prependData: `@use "@/shared/styles/mixins" as *;`,
  },
} satisfies NextConfig;
