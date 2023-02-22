import { graphMaxVals,  IMovie, movieState } from "@/util/types"
import GraphSelectionContainer from "../GraphSelectionContainer"
import BarGraphMovieItem from "../movieItems/BarGraphMovieItem"
import GridMovieItem from "../movieItems/GridMovieItem"
import { Chart ,ChartTypes} from "charts-css-react"

type Props={
    list:movieState[]
    movies:Map<string,IMovie>
    maxvals:graphMaxVals
}
export default function BarGraphConatiner({list,movies,maxvals}:Props) {
    return (<>
        <GraphSelectionContainer/><Chart type={"bar"} hideData showDataOnHover stacked multiple>
        {list.map(mv=>(<BarGraphMovieItem key={mv.id} movie={movies.get(mv.id)} maxvals={maxvals} state={mv.state} rank={mv.rank}/>))}
    
        </Chart>
   <style jsx>{`
				div {
				}
			`}</style></>)
}