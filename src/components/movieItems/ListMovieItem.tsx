import {  IMovie, movieState } from "@/util/types"
import Link from "next/link"
import Image from "next/image"
import { extractNumber, num2USD } from "@/util/util"
import { SortType } from "@/util/enum"

type Props={
    movie:IMovie|undefined
    state:movieState

}
export default function ListMovieItem({movie,state}:Props) {
    
    function onclick(){
        window.location.href=`/detail/`+movie?.id
    }function needExtra(){
        if(state.extraType==null) return false
        return ![SortType.WW_GROSS,SortType.RELEASE,SortType.RELEASE_OLD
        ].includes(state.extraType)
    }
    return (<>
        {movie?(<div onClick={onclick}> 
            <div className={`item ${state.state===1&&"active"} ${state.state===2&&"inactive"} list-group-item list-group-item-action`} >
                <div className="d-flex w-100 justify-content-between">
                

                    <h5 className="mb-1"><span className="badge bg-warning rounded-pill">{state.rank}</span>{movie.title}</h5>
                
                </div>
                <abbr className="mb-1">{num2USD(movie.worldwideGross)}<small> {movie.releaseDate}</small></abbr>
                <small className="text-muted"> {needExtra()&&state.extraData}</small>
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