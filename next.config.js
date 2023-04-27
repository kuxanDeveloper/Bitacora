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
  serverRuntimeConfig: {
    AES256_LOGIN_Key: "Qml0YWNvcmFMb2dpbiMyMDIzS3V4YW4=",
    AES256_USER_Key: "Qml0YWNvcmFVc3UjMjAyM0t1eGFuQw==",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://192.168.88.243:51421/ApiBitacora/api" // development api
        : "http://192.168.88.243:51421/ApiBitacora/api", // production api
  },
  swcMinify: true,

  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
});

module.exports = nextConfig;
