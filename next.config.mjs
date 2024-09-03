/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'rtgroihwoiiqctuykpgp.supabase.co',
        port: '',
        pathname: '**'
      }
    ],
  },
};

export default nextConfig;
