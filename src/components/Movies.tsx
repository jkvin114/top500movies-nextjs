import { ViewType } from "@/util/enum";
import { IMovie } from "@/util/types"
import Link from "next/link";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import MovieContainer from "./MovieContainer";
import Image from "next/image";
import FilterContainer from "./FilterContainer";
import ViewSelectionContainer from "./ViewSelectionContainer";
import { Filter } from "@/util/util";
import { SortSelection } from "./SortSelectionContainer";
type Props={
    movies:IMovie[]
}
export default function Movies({movies}:Props) {

    const [viewtype, setViewType] = useState<ViewType>(ViewType.LIST);
  
	const [filter, setFilter] = useState<Filter>(new Filter())
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
		case "rating":
			console.log("rating")
			setViewType(ViewType.RATING)
			break
	}
  }, [view]);

  	function getDirectors(movies: IMovie[]):string[]{
		let map=new Map<string, number>()
		for (const m of movies) {
			let count=map.get(m.director)
			if(count!==undefined){
				map.set(m.director, count+1)
			}
			else{
				map.set(m.director, 1)
			}
		}
		return [...map.keys()].filter((name)=>{
			let count=map.get(name)
			return count!=undefined && count>=2
		}).sort((a,b)=>a.localeCompare(b))
	}
	function getActors(movies: IMovie[]):string[]{
		let map=new Map<string, number>()
		for (const m of movies) {
			for(const actor of m.actors){

				let count=map.get(actor)
				if(count!==undefined){
					map.set(actor, count+1)
				}
				else{
					map.set(actor, 1)
				}
			}
		}
		return [...map.keys()].filter((name)=>{
			let count=map.get(name)
			return count!=undefined && count>=4
		}).sort((a,b)=>a.localeCompare(b))
	}
	function getCompanies(movies: IMovie[]):string[]{
		let map=new Map<string, number>()
		for (const m of movies) {
			let count=map.get(m.companies[0])
				if(count!==undefined){
					map.set(m.companies[0], count+1)
				}
				else{
					map.set(m.companies[0], 1)
				}
			// for(const comp of m.companies){

				
			// }
		}
		return [...map.keys()].filter((name)=>{
			let count=map.get(name)
			return count!=undefined && count>=3
		}).sort((a,b)=>a.localeCompare(b))
	}

	const directors= useMemo(() => getDirectors(movies), [movies])
	const actors= useMemo(() => getActors(movies), [movies])
	const companies= useMemo(() => getCompanies(movies), [movies])
    return <>
	<FilterContainer directors={directors} actors={actors} companies={companies} setFilter={setFilter} oldFilter={filter}/>
	<div className="container">

    <ViewSelectionContainer/>
	<SortSelection setFilter={setFilter}  oldFilter={filter}/>

	</div>
    <MovieContainer viewType={viewtype} movies={movies} filter={filter}/>
	<style jsx>
		{`
		`}
	</style>
    </>
}
