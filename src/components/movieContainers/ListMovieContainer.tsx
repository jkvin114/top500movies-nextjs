import { NextComponentType, NextPage } from "next"
import { AppProps } from "next/app"
import React, { ReactElement } from "react"
import { ViewType } from "@/util/enum"
import { IMovie, movieId } from "@/util/types"
import ListMovieItem from "../movieItems/ListMovieItem"

type Props={
    list:movieId[]
    movies:Map<string,IMovie>
}
export default function ListMovieConatiner({list,movies}:Props) {
    return (<><div className="list-group">
    {list.map(mv=>(<ListMovieItem key={mv.id} movie={movies.get(mv.id)} state={mv.state} rank={mv.rank}/>))}
    </div></>)
}