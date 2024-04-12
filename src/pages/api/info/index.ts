// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from '@/lib/mongoDB';
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  success: boolean,
  data:any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req
  if(method==="GET"){
    const client = await clientPromise;
    const db = client.db("AllTimeMovieData");
    const info = await db.collection("info").findOne()
    res.status(200).json({ success: true ,data:info})
  }
}