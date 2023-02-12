import React, { ReactElement, useEffect, useMemo, useState } from "react"
import { FilterType, FilterViewType, SortType, ViewType } from "@/util/enum"
import { graphMaxVals, IMovie, movieId } from "@/util/types"
import ImageMovieConatiner from "./movieContainers/ImageMovieContainer"
import ListMovieContainer from "./movieContainers/ListMovieContainer"
import GridMovieConatiner from "./movieContainers/GridMovieContainer"
import Link from "next/link"
import { useRouter } from "next/router"
import BarGraphConatiner from "./movieContainers/BarGraphMovieContainer"
import { Filter, getMaxVal } from "@/util/util"
import PageNav from "./PageNav"
type Props = {
	viewType: ViewType
	allTimeRanks: string[]
	movies: IMovie[]
    filter:Filter
}

export default function MovieContainer({ viewType, movies,filter }: Props) {
	const [currPage, updatePage] = useState<number>(1)
	const [currPageSize, updatePageSize] = useState<number>(10)
	const [maxvals, setMaxvals] = useState<graphMaxVals>({
		wwgross: 0,
		dmgross: 0,
		runtime: 0,
	})
	function sortMovies(movies: IMovie[],filter:Filter): movieId[] {
		let sorted = filter
			.run(movies)
		let maxww = getMaxVal(sorted, (id: movieId) => movieMap.get(id.id)?.worldwideGross)
		let maxdm = getMaxVal(sorted, (id: movieId) => movieMap.get(id.id)?.domesticGross)
		let maxruntime = getMaxVal(sorted, (id: movieId) => movieMap.get(id.id)?.runtimeMins)

		setMaxvals({ ...maxvals, wwgross: maxww, dmgross: maxdm, runtime: maxruntime })
		return sorted
	}
	function mapMovies(movies: IMovie[]): Map<string, IMovie> {
		let map = new Map<string, IMovie>()
		for (const m of movies) {
			map.set(m.id, m)
		}
		return map
	}
	const router = useRouter()
	const { page, pagesize } = router.query
	useEffect(() => {
		if (typeof page === "string") updatePage(Number(page))
		if (typeof pagesize === "string") updatePageSize(Math.min(Number(pagesize), 50))
	}, [page, pagesize, viewType])

	const movieMap = useMemo(() => mapMovies(movies), [movies])
	const sortedList = useMemo(() => sortMovies(movies,filter), [movies,filter])
	const slicedList = sortedList.slice((currPage - 1) * currPageSize, currPage * currPageSize)
	return (
		<>
			<div className="movie-container">
				<PageNav currPage={currPage} currPageSize={currPageSize} totalLength={sortedList.length}/>
                <h5>{sortedList.length} movies found.</h5>
                <h5>Sorted by {filter.sort1}</h5>
				{viewType === ViewType.IMAGE && <ImageMovieConatiner list={slicedList} movies={movieMap} />}
				{viewType === ViewType.LIST && <ListMovieContainer list={slicedList} movies={movieMap} />}
				{viewType === ViewType.GRID && <GridMovieConatiner list={slicedList} movies={movieMap} />}
				{viewType === ViewType.BAR_GRAPH && <BarGraphConatiner list={slicedList} movies={movieMap} maxvals={maxvals} />}
			</div>
			<style jsx>{`
                h5{
                    text-align:center;
                }
                `}</style>
		</>
	)
}
