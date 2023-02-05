import { IImageMovieItem, IMovie } from "@/util/types"
import Link from "next/link"
import Image from "next/image"
import { num2USD } from "@/util/util"

type Props={
    movie:IMovie|undefined
}
export default function ListMovieItem({movie}:Props) {
    return (<>
        {movie?(<Link href={`/detail/`+movie.id}>
            <div>{movie.title +"  "+num2USD(movie.worldwideGross)}</div>
        </Link>):""}
        <style jsx>{`
            div{
                border:2px solid black;
                margin:3px;
                font-size:15px;
                display:block;
            }
			`}</style>
    </>)
}