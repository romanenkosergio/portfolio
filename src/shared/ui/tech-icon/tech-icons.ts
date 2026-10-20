import Astro from "@/public/assets/icons/tech/astro.svg";
import Django from "@/public/assets/icons/tech/django.svg";
import Expo from "@/public/assets/icons/tech/expo.svg";
import Godot from "@/public/assets/icons/tech/godot.svg";
import Gulp from "@/public/assets/icons/tech/gulp.svg";
import Javascript from "@/public/assets/icons/tech/javascript.svg";
import Nestjs from "@/public/assets/icons/tech/nestjs.svg";
import Nextjs from "@/public/assets/icons/tech/nextjs.svg";
import React from "@/public/assets/icons/tech/react.svg";
import Sass from "@/public/assets/icons/tech/sass.svg";
import Shopify from "@/public/assets/icons/tech/shopify.svg";
import Telegram from "@/public/assets/icons/tech/telegram.svg";
import Typescript from "@/public/assets/icons/tech/typescript.svg";
import Vue from "@/public/assets/icons/tech/vue.svg";
import Webpack from "@/public/assets/icons/tech/webpack.svg";

import type { SVGComponent } from "../icon/icon.types";

// Server-only: the logos of the projects page. Kept out of the `ICONS` map, which every client
// component that renders an Icon ships; import this slice by path, never via the barrel.
export const TECH_ICONS = {
  astro: Astro,
  django: Django,
  expo: Expo,
  godot: Godot,
  gulp: Gulp,
  javascript: Javascript,
  nestjs: Nestjs,
  nextjs: Nextjs,
  react: React,
  sass: Sass,
  shopify: Shopify,
  telegram: Telegram,
  typescript: Typescript,
  vue: Vue,
  webpack: Webpack
} satisfies Record<string, SVGComponent>;
