import { graphMaxVals,  IMovie } from "@/util/types"
import Link from "next/link"
import Image from "next/image"
import { num2USD } from "@/util/util"

type Props={
    movie:IMovie|undefined
    maxvals:graphMaxVals
    active:boolean
}
export default function BarGraphMovieItem({movie,maxvals,active}:Props) {
    return (<>
        {movie?(<>
            <div className={`item ${!active&&"inactive"} bg-black`}>
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
                    width:${(100*(movie.runtimeMins/maxvals.runtime))+"%"};
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
                
                .item.inactive{
                    filter:brightness(0.5);
                }
			`}</style></>
        ):""}</>
        
    )
}