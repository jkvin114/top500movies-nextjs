import { graphMaxVals,  IMovie, movieId } from "@/util/types"
import GraphSelectionContainer from "../GraphSelectionContainer"
import BarGraphMovieItem from "../movieItems/BarGraphMovieItem"
import GridMovieItem from "../movieItems/GridMovieItem"

type Props={
    list:movieId[]
    movies:Map<string,IMovie>
    maxvals:graphMaxVals
}
export default function BarGraphConatiner({list,movies,maxvals}:Props) {
    return (<><div>
        <GraphSelectionContainer/>
    {list.map(mv=>(<BarGraphMovieItem key={mv.id} movie={movies.get(mv.id)} maxvals={maxvals} active={mv.active}/>))}
    </div><style jsx>{`
				div {
				}
			`}</style></>)
}