/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/registrar',
        permanent: true,
      },
    ];
  }

};

export default nextConfig;
