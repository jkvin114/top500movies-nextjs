import { NextComponentType, NextPage } from "next"
import { AppProps } from "next/app"
import React, { ReactElement } from "react"
import { ViewType } from "@/util/enum"
import { IMovie } from "@/util/types"
import ListMovieItem from "../movieItems/ListMovieItem"

type Props={
    list:string[]
    movies:Map<string,IMovie>
}
export default function ListMovieConatiner({list,movies}:Props) {
    return (<><div>
    {list.map(id=>(<ListMovieItem key={id} movie={movies.get(id)}/>))}
    </div><style jsx>{`
			`}</style></>)
}