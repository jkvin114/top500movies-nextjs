import { IImageMovieItem, IMovie } from "@/util/types"
import GridMovieItem from "../movieItems/GridMovieItem"

type Props={
    list:string[]
    movies:Map<string,IMovie>
}
export default function GridMovieConatiner({list,movies}:Props) {
    return (<><div>
    {list.map(id=>(<GridMovieItem key={id} movie={movies.get(id)}/>))}
    </div><style jsx>{`
				div {
					display:flex;
                    flex-wrap:wrap;
                    justify-content:center;
                    align-items:stretch;
				}
			`}</style></>)
}