import { IMovie } from "@/util/types"
import Link from "next/link"
import Image from "next/image"
import "./../../styles/Home.module.css"
type Props={
    movie:IMovie|undefined
    active:boolean
}
export default function ImageMovieItem({movie,active}:Props) {
    return (<>
        {movie?(<div className="item group">< Link href={`/detail/`+movie.id} >
            <Image  src={movie.image} alt="poster"
                className="rounded group-hover:opacity-0.6"
			    width={200} height={300}/>
                <style jsx>{`
				.item {
                    height:300px;
                    margin:7px;
                    box-shadow:3px;
                    overflow:hidden;
				}
                
                .image-hover{
                    transform:scale(1.1);
                    opacity:0.8;
                }
			`}</style>
        </Link></div>):""}</>
        
    )
}