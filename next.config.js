const { redirect } = require('next/dist/server/api-utils')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/images/M/**',
      },
    ],
    images: {
      domains: ['m.media-amazon.com'],
    },
  
  },
 reactStrictMode: true,
 async redirects(){
  return[{
    source:"/home",
    destination:"/",
    permanent:false
  }]
  }
}

module.exports = nextConfig
