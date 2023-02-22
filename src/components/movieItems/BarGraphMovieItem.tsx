import { graphMaxVals,  IMovie } from "@/util/types"
import Link from "next/link"
import Image from "next/image"
import { num2USD, summarizeUSD } from "@/util/util"
import { Data } from "charts-css-react"
import { CSSProperties, useEffect, useState } from "react"
type Props={
    movie:IMovie|undefined
    maxvals:graphMaxVals
    state:number
    rank:number
}
export default function BarGraphMovieItem({movie,maxvals,state}:Props) {
    const ratio=(movie?movie.worldwideGross/maxvals.wwgross:0)
    const [labelPos,setLabelPos]=useState<string>("inner")
    const [value,setValue]=useState<string>("N/A")
    useEffect(()=>{
       if((window.innerWidth-50)*ratio <120){
            setLabelPos("outer")
       }
       else if((window.innerWidth-50)*ratio <290){
            setLabelPos("partial")
        }else{
            setLabelPos("inner")
       } 

       if (window.matchMedia("(orientation: portrait)").matches) {
            // you're in PORTRAIT mode
            setValue(summarizeUSD(movie?movie.worldwideGross:0))
            setLabelPos("portrait")
        }
        
        if (window.matchMedia("(orientation: landscape)").matches) {
            // you're in LANDSCAPE mode
            setValue(num2USD(movie?movie.worldwideGross:0))
        }

    },[window.innerWidth])
    return (<>
        {movie?(<>
            <tr className={`item ${state===1&&"active"} ${state===2&&"inactive"}`}>
            {labelPos==="portrait"&&(<>
                <Data style={{"--color": "#FF5555","--size":String(ratio)} as CSSProperties }>
                <div className="info">
                    <div className="value"></div>
                </div>
                </Data>
                <div className="info-portrait">
                    <div className="value">{value}</div>
                    <div className="title">{movie.title}</div>
                </div>
                </>
                
            )}{labelPos==="inner"&&(
                <Data style={{"--color": "#FF5555","--size":String(ratio)} as CSSProperties }>
                
                <div className="info">
                    <div className="value">{value}</div>
                    <div className="title">{movie.title}</div>
                </div>
                </Data>
            )}{
            labelPos==="partial"&&(
                <>

                <Data style={{"--color": "#FF5555","--size":String(ratio)} as CSSProperties }>
                <div className="info">
                <div className="value">{value}</div>
                    
                </div>
                </Data>
                <Data className="trans" style={{"--color":"rgba(230, 30, 30,0)","--size":String(1-ratio)} as CSSProperties }>
                <div className="info">
                <div className="title">{movie.title}</div>
                </div>
                
                </Data>
                </>
            )}
            {labelPos==="outer"&&(

                <><Data style={{"--color": "#FF5555","--size":String(ratio)} as CSSProperties }>
                   
                </Data>
                <Data style={{"--color":"rgba(230, 30, 30,0)","--size":String(1-ratio)} as CSSProperties }>
                <div className="info">
                <div className="value">{value}</div>
                <div className="title">{movie.title}</div>
                    
                </div>
                
                </Data></>
                
            )}
                {/* <span className="bar">

                </span>
                <div className="text">
                    
                    <text className="value">
                        {num2USD(movie.worldwideGross)}
                    </text>
                    <text className="title">
                        {movie.title}
                    </text>
                </div> */}
            </tr>
                <style jsx>{`
                    tr{
                        height:35px;
                    }
                    .bar-container{
                        width:100%;
                    }
                    .info,.info-portrait{
                        width:100%;
                        height:35px;
                    }   
                    .info-portrait{
                        position:absolute;
                        top:0;
                        left:0;
                    }
                    .trans{
                        --color: rgba(0,0,0,0);
                    }
				.item {
                    display:block;
                    position:relative;
                   
                    margin:1px;
                    color:white;
				}
                .title{
                    display:inline-block;
                    width:160px;
                    height:min-content;
                    font-size:13px;
                    vertical-align: -webkit-baseline-middle;
                    margin-left:10px;
                    line-height:14px;

                }
                .value{
                    vertical-align: top;
                    line-height:35px;
                    margin-left:7px;
                    display:inline;
                    width:130px;
                    font-size:15px;
                    font-weight:bold;
                }
                .item.inactive{
                    filter:brightness(0.5);
                }
			`}</style></>
        ):""}</>
        
    )
}