import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

let client
let clientPromise:any


if(!uri){
    console.error("invalid mongodb url")
}
else{

    client = new MongoClient(uri, {})
    clientPromise = client.connect()
    console.log("connected to mongodb")
    
}


export default clientPromise
