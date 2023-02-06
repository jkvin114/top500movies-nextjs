import { ViewType } from "@/util/enum";
import { IMovie } from "@/util/types"
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MovieContainer from "./MovieContainer";

type Props={
    allTimeRanks:string[],
    movies:IMovie[]
}
export default function Movies({allTimeRanks,movies}:Props) {

    const [viewtype, setViewType] = useState<ViewType>(ViewType.LIST);
    const [currPage, setPage] = useState<number>(1);
  
    const router=useRouter()
    
    const { view } = router.query
    useEffect(() => {
	switch(view){
		case "list":
			setViewType(ViewType.LIST)
			break
		case "grid":
			setViewType(ViewType.GRID)
			break
		case "image":
			setViewType(ViewType.IMAGE)
			break
		case "graph":
			setViewType(ViewType.GRAPH)
			break
		case "bar_graph":
			setViewType(ViewType.BAR_GRAPH)
			break
	}
  }, [view]);

    return <>
    <div>
        
    <Link  href={{ pathname: '/', query: {...router.query, view: "image"} }}>image</Link>
    <Link href={{ pathname: '/', query: {...router.query, view: "list"} }}>list</Link>
    <Link href={{ pathname: '/', query: {...router.query, view: "grid"} }}>grid</Link>
    <Link href={{ pathname: '/', query: {...router.query, view: "bar_graph"} }}>bar</Link>
    </div>
    <MovieContainer allTimeRanks={allTimeRanks} viewType={viewtype} movies={movies}
				page={currPage} pageSize={10}/>
    </>
}
