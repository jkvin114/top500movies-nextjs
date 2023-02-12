import {  IMovie } from "@/util/types"
import Link from "next/link"
import Image from "next/image"
import { extractNumber, num2USD } from "@/util/util"

type Props={
    movie:IMovie|undefined
    active:boolean
}
export default function ListMovieItem({movie,active}:Props) {
    return (<>
        {movie?(<Link href={`/detail/`+movie.id}>
            <div className={`item ${active?"active":"inactive"}`} >{movie.title +"  "+num2USD(movie.worldwideGross)}</div>
        </Link>):""}
        <style jsx>{`
            .item{
                border:2px solid black;
                margin:3px;
                font-size:15px;
                display:block;
                background:#666666;
                color:whitesmoke;
            }
            .item.inactive{
                filter:brightness(0.7);
            }
            .item.active{
                outline:2px solid lightblue;
            }
			`}</style>
    </>)
}