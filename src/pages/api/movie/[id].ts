// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import { Movie } from '@/DBSchemas.ts/Movie'
import clientPromise from '@/lib/mongoDB'
type Data = {
  success: boolean,
  data:any
}
console.log("dbconnect")
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req
  const { id } = req.query
  if(method==="GET"){
    const client = await clientPromise;
    const db = client.db("AllTimeMovieData");

    // res.status(200).json({ success: true ,data:"hi"+id})
    // console.log(id)
    // return
    const movie = await db.collection("movie").find({}).limit(10).toArray()
    console.log(movie)
    res.status(200).json({ success: false ,data:movie})
  }
}
