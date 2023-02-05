import { graphMaxVals, IImageMovieItem, IMovie } from "@/util/types"
import Link from "next/link"
import Image from "next/image"
import { num2USD } from "@/util/util"

type Props={
    movie:IMovie|undefined
    maxvals:graphMaxVals
}
export default function BarGraphMovieItem({movie,maxvals}:Props) {
    return (<>
        {movie?(<Link href={`/detail/`+movie.id}>
            <div className="item">
                <span className="bar">

                </span>
                <div className="text">
                    
                    <b className="value">
                        {num2USD(movie.worldwideGross)}
                    </b>
                    <b className="title">
                        {movie.title}
                    </b>
                </div>
            </div>
                <style jsx>{`
				.item {
                    display:block;
                    position:relative;
                    height:30px;
                    margin:2px;
				}
                .bar{
                    position:absolute;
                    top:0;
                    left:0;
                    height:30px;
                    width:${(100*(movie.worldwideGross/maxvals.wwgross))+"%"};
                    background:green;
                }
                .text{
                    position:absolute;
                    top:0;
                    left:0;
                    line-height:30px;
                    color:white;
                    font-weight:normal;
                }
                .value{
                    display: inline-block;
                    width:120px;
                }
                b{
                    font-weight: normal;
                }
			`}</style>
        </Link>):""}</>
        
    )
}