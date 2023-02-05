import { IImageMovieItem, IMovie } from "@/util/types"
import Link from "next/link"
import Image from "next/image"

type Props={
    movie:IMovie|undefined
}
export default function ImageMovieItem({movie}:Props) {
    return (<>
        {movie?(< Link href={`/detail/`+movie.id}><div className="item">
            <Image  src={movie.image} alt="poster"
			    width={200} height={300}/>
                <style jsx>{`
				.item {
                    
                    margin:7px;
                    box-shadow:3px;
                    border-radius:7px;
                    overflow:hidden;
				}
			`}</style>
        </div></Link>):""}</>
        
    )
}