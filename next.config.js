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
      },{
        protocol: 'https',
        hostname: 'imdb-api.com',
        port: '',
        pathname: '/images/original/**',
      },
    ],
    images: {
      domains: ['m.media-amazon.com'],
    },
  
  },
 reactStrictMode: true,
//  async redirects(){
//   return[{
//     source:"/detail",
//     destination:"/",
//     permanent:false
//   }]
//   }
}

module.exports = nextConfig
