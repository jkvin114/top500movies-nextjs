## Deployment
[http://ec2-34-202-98-227.compute-1.amazonaws.com:3000](http://ec2-34-202-98-227.compute-1.amazonaws.com:3000/)

## Tech Stacks
- Next.js
- React.js
- Bootstrap 5
- Typescript
- MongoDB

## Movie APIs
- [TheMovieDB](https://www.themoviedb.org/)
- [IMDb API](https://imdb-api.com/)




This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker setup

```bash
docker build [path] -t [imagename]
docker run -d -p 3000:3000 --name [containername] [imagename]
```