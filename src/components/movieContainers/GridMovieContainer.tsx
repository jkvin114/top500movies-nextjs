import {  IMovie, movieState } from "@/util/types"
import GridMovieItem from "../movieItems/GridMovieItem"

type Props={
    list:movieState[]
    movies:Map<string,IMovie>
}
export default function GridMovieConatiner({list,movies}:Props) {
    
    return (<><div>
    {list.map(mv=>(<GridMovieItem key={mv.id} movie={movies.get(mv.id)} state={mv}/>))}
    </div>
    <style jsx>{`
				div {
					display:flex;
                    flex-wrap:wrap;
                    justify-content:center;
                    align-items:stretch;
				}
			`}</style></>)
}