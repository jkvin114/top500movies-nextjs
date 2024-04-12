import {  IMovie, movieState } from "@/util/types"
import Link from "next/link"
import Image from "next/image"
import { extractNumber, num2USD } from "@/util/util"
import { SortType } from "@/util/enum"
import { useRouter } from "next/router"

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
    const router=useRouter()
    return (<>
        {movie?(
        <Link as={`/detail/`+movie?.id}
        href={{
        pathname: `/`,
        query: { ...router.query ,movieId:movie?.id},
    }} shallow={true} scroll={false}>
            <div className={`item ${state.state===1&&"active"} ${state.state===2&&"inactive"} list-group-item list-group-item-action`} >
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1"><span className="badge bg-warning rounded-pill">{state.rank}</span>{movie.title}</h5>
                </div>
                <abbr className="mb-1">{movie.releaseDate}<small> {num2USD(movie.worldwideGross)}</small></abbr>
                <small className="text-muted"> {needExtra()&&state.extraData}</small>
           {/* {movie.title +"  "+num2USD(movie.worldwideGross)} */}
           </div>
        </Link>):""}
        <style jsx>{`
            h5{
                font-size:17px;
            }

            .item{
                cursor:pointer;
                font-size:14px;
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
            .list-group-item.active{
                z-index:0;
            }
			`}</style>
    </>)
}