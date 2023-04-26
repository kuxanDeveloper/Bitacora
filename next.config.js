/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = withPWA({
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png)",

        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            type: "cookie",
            key: "authorized",
            value: "true",
          },
          {
            key: "Set-Cookie",
            value: `SameSite=Lax, SameSite=None; Secure `,
          },
        ],
      },
    ];
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "https://zde4h.sse.codesandbox.io/api" // development api
        : "https://zde4h.sse.codesandbox.io/api", // production api
  },
  swcMinify: true,

  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
});

module.exports = nextConfig;
