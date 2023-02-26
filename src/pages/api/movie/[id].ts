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
  const { id,from } = req.query
  if(method==="GET"){
    
    const client = await clientPromise;
    const db = client.db("AllTimeMovieData");
    if(from==="list"){

    
      const movie = await db.collection("list").findOne({id:id})
      if(!movie){
        res.status(404).json({ success: false,data:null})
        return
      } 
      res.status(200).json({ success: true ,data:movie.tmdb_id})
    }
    else if(from==="movies"){

      const movie = await db.collection("movie").findOne({id:id})
      if(!movie){
        res.status(404).json({ success: false,data:null})
        return
      } 
      res.status(200).json({ success: true ,data:movie})
    }
  }
}
