import {   IMovie, movieState } from "@/util/types"

import RatingMovieItem from "../movieItems/RatingMovieItem"

type Props={
    list:movieState[]
    movies:Map<string,IMovie>
}
export default function RatingConatiner({list,movies}:Props) {
    return (<><div>
        {list.map(mv=>(<RatingMovieItem key={mv.id} movie={movies.get(mv.id)} state={mv} />))}
    </div>
    <style jsx>
    {`
        div {
            display:flex;
            flex-wrap:wrap;
            justify-content:center;
            align-items:stretch;
        }
    `}</style></>)
}