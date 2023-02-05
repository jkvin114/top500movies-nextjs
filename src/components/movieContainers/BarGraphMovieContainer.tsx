import { graphMaxVals, IImageMovieItem, IMovie } from "@/util/types"
import BarGraphMovieItem from "../movieItems/BarGraphMovieItem"
import GridMovieItem from "../movieItems/GridMovieItem"

type Props={
    list:string[]
    movies:Map<string,IMovie>
    maxvals:graphMaxVals
}
export default function BarGraphConatiner({list,movies,maxvals}:Props) {

    return (<><div>
    {list.map(id=>(<BarGraphMovieItem key={id} movie={movies.get(id)} maxvals={maxvals}/>))}
    </div><style jsx>{`
				div {
				}
			`}</style></>)
}