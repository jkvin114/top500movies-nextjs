import { IMovie } from "@/util/types"
import Link from "next/link"
import Image from "next/image"
import "./../../styles/Home.module.css"
type Props={
    movie:IMovie|undefined
    state:number
    rank:number
}
export default function ImageMovieItem({movie,state,rank}:Props) {
    
    function onclick(){
        window.location.href=`/detail/`+movie?.id
    }
    return (<>
        {movie?(<div className={`item col card ${state===1&&"active bg-secondary"} ${state===2&&"inactive"}`}>
        <span className="badge bg-warning rounded-pill">{rank}</span>
            < Link href={`/detail/`+movie.id} >
            <Image  src={movie.image} alt="poster"
                className="rounded"
			    width={200} height={300}/>
            </Link>
            <div className="card-body">
                <h5 onClick={onclick} className="card-title">{movie.title}</h5>
   
            </div>
                <style jsx>{`
				.item {
                    margin:7px;
                    box-shadow:3px;
                    overflow:hidden;
                    border:none;
                    position:relative;
                    padding-top:7px;
				}
                .card-title{
                    cursor:pointer;
                    font-weight:bold;
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