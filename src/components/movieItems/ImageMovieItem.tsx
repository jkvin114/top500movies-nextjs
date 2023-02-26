import { IMovie } from "@/util/types"
import Link from "next/link"
import Image from "next/image"
import "./../../styles/Home.module.css"
import { useRouter } from "next/router"
type Props={
    movie:IMovie|undefined
    state:number
    rank:number
}
export default function ImageMovieItem({movie,state,rank}:Props) {
    
    function onclick(){
        window.location.href=`/detail/`+movie?.id
    }
    const router=useRouter()

    return (<>
        {movie?(<div className={`item col card ${state===1&&"active bg-secondary"} ${state===2&&"inactive"}`}>
        <span className="badge bg-warning rounded-pill">{rank}</span>
        <div className='poster-link '>
        <Link as={`/detail/`+movie?.id}
            href={{
            pathname: `/`,
            query: { ...router.query ,movieId:movie?.id},
        }} shallow={true} scroll={false}>
                    
                    <img src={movie.image} alt="poster"
                        className="rounded poster d-sm-none d-md-block d-none"/>
                    <img src={movie.image} alt="poster"
                        className="rounded poster-small d-sm-block d-md-none"/>
            </Link>
        </div>
            <div className="card-body">
                <h5 onClick={onclick} className="card-title">{movie.title}</h5>
   
            </div>
                <style jsx>{`
                    .poster-link{
                        width: fit-content;
                    }
                    .poster{
                        width:200px;
                        height:300px;
                    }
                    .poster-small{
                        
                        width:140px;
                        height:210px;
                    }
				.item {
                    width:min-content;
                    overflow:hidden;
                    border:none;
                    position:relative;
                    padding-top:5px;
				}
                .card-title{
                    cursor:pointer;
                    font-weight:bold;
                    font-size:16px;
                    color:whitesmoke;
                }
                .card-title:hover{
                    text-decoration:underline;

                }
            .badge{
                position:absolute;
                top:0;
                left:0;
                color:black;
                font-size:15px;
            }
            
                .item.active{
                    
                }
                .item.inactive{
                    filter:brightness(0.5);
                }
			`}</style>
        </div>):""}</>
        
    )
}