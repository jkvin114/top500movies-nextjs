import { NextComponentType, NextPage } from "next"
import { AppProps } from "next/app"
import React, { ReactElement } from "react"
import { ViewType } from "@/util/enum"
import { IImageMovieItem, IMovie } from "@/util/types"
import ImageMovieItem from "../movieItems/ImageMovieItem"

type Props={
    list:string[]
    movies:Map<string,IMovie>
}
export default function ImageMovieConatiner({list,movies}:Props) {
    return (<><div>
    {list.map(id=>(<ImageMovieItem key={id} movie={movies.get(id)}/>))}
    </div><style jsx>{`
				div {
					display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
				}
			`}</style></>)
}