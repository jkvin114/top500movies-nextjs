import { NextComponentType, NextPage } from "next"
import { AppProps } from "next/app"
import React, { ReactElement } from "react"
import { ViewType } from "@/util/enum"
import {  IMovie, movieId } from "@/util/types"
import ImageMovieItem from "../movieItems/ImageMovieItem"

type Props={
    list:movieId[]
    movies:Map<string,IMovie>
}
export default function ImageMovieConatiner({list,movies}:Props) {
    return (<><div>
    {list.map(mv=>(<ImageMovieItem key={mv.id} movie={movies.get(mv.id) }active={mv.active}/>))}
    </div><style jsx>{`
				div {
					display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
				}
			`}</style></>)
}