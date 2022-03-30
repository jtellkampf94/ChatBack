/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  reactStrictMode: false,
  images: {
    domains: ["jt-whatsapp-clone-bucket.s3.eu-west-2.amazonaws.com"],
  },
};
