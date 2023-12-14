/* eslint-disable no-param-reassign */
/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  register: true,

  // disable: process.env.NODE_ENV === "development",
});

const nextConfig = {};

module.exports = withPWA(nextConfig);
