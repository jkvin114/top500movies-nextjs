import { IImageMovieItem, IMovie } from "@/util/types"
import Link from "next/link"
import Image from "next/image"
import { num2USD } from "@/util/util"

type Props={
    movie:IMovie|undefined
}
export default function GridMovieItem({movie}:Props) {
    return (<>
        {movie?(<div className="item"><Link href={`/detail/`+movie.id}>
            <div>
                <div className="title">{movie.title}</div>
                <div className="content">
                    <div>
                    <Image src={movie.image} alt="poster"
			            width={100} height={150}/>
                    </div>
                    <div>
                        <div>Release date: {movie.releaseDate}</div>
                        <div>Revenue: {num2USD(movie.worldwideGross)}</div>
                        <div>Director: {movie.director}</div>
                        <div>Runtime: {movie.runtimeMins} mins</div>
                    </div>
                </div>
            </div>
        </Link></div>
        ):""}
        <style jsx>{`
            .item{
                border:2px solid black;
                margin:3px;
                padding:5px;
                font-size:15px;
                display:block;
                background:black;
                color:white;
                width:300px;
                {/* flex-grow:1; */}
            }
            .content{
                display:grid;
                grid-template-columns:100px 200px;
            }
			`}</style>
    </>)
}