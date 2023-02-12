import {  IMovie } from "@/util/types"
import Link from "next/link"
import Image from "next/image"
import { num2USD } from "@/util/util"

type Props={
    movie:IMovie|undefined
    active:boolean
}
export default function GridMovieItem({movie,active}:Props) {
    return (<>
        {movie?(<div className={`item ${active?"active":"inactive"}`}><Link href={`/detail/`+movie.id}>
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
            } .item.inactive{
                filter:brightness(0.7);
            }
            .item.active{
            }
			`}</style>
    </>)
}
/**
 * 
    <div className="card mb-3 bg-body-secondary">
        <div className="row g-0">
            <div className="col-md-4">
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    </div>
 */