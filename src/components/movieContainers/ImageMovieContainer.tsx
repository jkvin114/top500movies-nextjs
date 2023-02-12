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
    return (<><div className="container"><div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-6">
        {list.map(mv=>(<ImageMovieItem key={mv.id} movie={movies.get(mv.id) }active={mv.active}/>))}
    </div>
    
    </div><style jsx>{`
				
			`}</style></>)
}