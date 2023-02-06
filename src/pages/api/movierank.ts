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
  let limit=req.query.limit
  if(!limit || Number.isNaN(Number(limit))) limit="200"
  if(method==="GET"){
    const client = await clientPromise;
    const db = client.db("AllTimeMovieData");

    const movie = await db.collection("rank").find({}).sort({"rank":1}).limit(Number(limit)).toArray()
    res.status(200).json({ success: true ,data:movie})
  }
}
