import {  IMovie } from "@/util/types"
import Link from "next/link"
import Image from "next/image"
import { extractNumber, num2USD } from "@/util/util"

type Props={
    movie:IMovie|undefined
    state:number
    rank:number
}
export default function ListMovieItem({movie,state,rank}:Props) {
    
    function onclick(){
        window.location.href=`/detail/`+movie?.id
    }
    return (<>
        {movie?(<div onClick={onclick}> 
            <div className={`item ${state===1&&"active"} ${state===2&&"inactive"} list-group-item list-group-item-action`} >
                <div className="d-flex w-100 justify-content-between">
                

                    <h5 className="mb-1"><span className="badge bg-warning rounded-pill">{rank}</span>{movie.title}</h5>
                
                </div>
                <abbr className="mb-1">{num2USD(movie.worldwideGross)}<small> {movie.releaseDate}</small></abbr>
           {/* {movie.title +"  "+num2USD(movie.worldwideGross)} */}
           </div>
        </div>):""}
        <style jsx>{`
            .item{
                {/* border:2px solid gray; */}
                cursor:pointer;
            }
            .item.inactive{
                filter:brightness(0.7);
            }
            .item.active{
                outline:2px solid lightblue;
            }
            span{
                margin-right:5px;
                color:black;
            }
			`}</style>
    </>)
}