import {  IMovie, movieState } from "@/util/types"
import { num2USD } from "@/util/util"
import { SortType } from "@/util/enum"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import Ratings from "./Ratings"
type Props={
    movie:IMovie|undefined
    state:movieState
}
export default function RatingMovieItem({movie,state}:Props) {

    function onclick(){
        window.location.href=`/detail/`+movie?.id
    }
    function needExtra(){
        if(state.extraType==null) return false
        return ![SortType.RATING_IMDB,SortType.RATING_IMDB_INC,SortType.RATING_META,SortType.RATING_META_INC,SortType.RELEASE,SortType.RELEASE_OLD
            ,SortType.RATING_RT_INC,SortType.RATING_RT,SortType.RATING_RT_AUDIENCE,SortType.RATING_RT_AUDIENCE_INC]
            .includes(state.extraType)
    }
    
    const router=useRouter()
    return (<>
        <Link as={`/detail/`+movie?.id}
            href={{
            pathname: `/`,
            query: { ...router.query ,movieId:movie?.id},
        }} shallow={true} scroll={false}>
        <div className={`item ${state.state===0&&"bg-body-secondary border-0"} ${state.state===1&&"active bg-body-secondary "} ${state.state===2&&"inactive "} card mb-3`}>
            <span className="badge bg-warning rounded-pill">{state.rank}</span>
        <div className={`row g-0 header`}>
            <div className="card-body">
                <h6 className="card-subtitle movie-title">{movie?.title}</h6>
                <div className="card-text">
                    <small className="text-muted">{movie?.releaseDate} <small className="text-muted">{(state.extraData!=null&& needExtra())&&state.extraData} </small></small>
                    {/* <div className="card-text"></div> */}
                </div>
            </div>
        </div>

        <Ratings movie={movie}/>


      </div></Link>
        <style jsx>{`
            .card-body{
                padding-bottom:4px;
            }
            .header{
                min-height:80px;
                text-align:center;
            }
            .item{
                margin:6px;
                position:relative;
                padding:5px;
                display:block;
                width:300px;
                cursor:pointer;
                {/* flex-grow:1; */}
            } .item.inactive{
                filter:brightness(0.7);
            }
            .badge{
                position:absolute;
                top:0;
                left:0;
                color:black;
            }
            
            .item.active{
                outline:2px solid whitesmoke;
            }
            .item.active{
            }
            .movie-title{
                color:whitesmoke;

                font-weight:bold;
            }
			`}</style>
    </>)
}