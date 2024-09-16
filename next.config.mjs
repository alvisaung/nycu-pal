/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  images: {
    path: "/",
  },
  output: "standalone",
};

export default withNextIntl(nextConfig);
