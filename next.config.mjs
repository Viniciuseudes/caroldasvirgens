/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Substitua a regra 'unoptimized: true' pela regra 'remotePatterns'
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pkcofyoymbjfztbxtknw.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig