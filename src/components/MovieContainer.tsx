import React, { ReactElement, useEffect, useMemo, useState } from "react"
import { FilterType, FilterViewType, SortType, ViewType } from "@/util/enum"
import { graphMaxVals, IMovie, movieState } from "@/util/types"
import ImageMovieConatiner from "./movieContainers/ImageMovieContainer"
import ListMovieContainer from "./movieContainers/ListMovieContainer"
import GridMovieConatiner from "./movieContainers/GridMovieContainer"
import Link from "next/link"
import { useRouter } from "next/router"
import BarGraphConatiner from "./movieContainers/BarGraphMovieContainer"
import { extractNumber, Filter, getMaxVal, isValidCurrency } from "@/util/util"
import PageNav from "./PageNav"
import RatingConatiner from "./movieContainers/RatingMovieContainer"
type Props = {
	viewType: ViewType
	movies: IMovie[]
    filter:Filter
}

export default function MovieContainer({ viewType, movies,filter }: Props) {
	const [currPage, updatePage] = useState<number>(1)
	const [currPageSize, updatePageSize] = useState<number>(10)
	function sortMovies(movies: IMovie[],filter:Filter): movieState[] {
		let sorted = filter
			.run(movies)
		
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
			<div className="movie-container container">
                <h5><b>{((currPage - 1) * currPageSize+1)+"-"+Math.min(sortedList.length,(currPage) * currPageSize )+"/"+sortedList.length}</b> Movies</h5>
                {/* <h5>Sorted by {filter.sort1}</h5> */}
				{viewType === ViewType.IMAGE && <ImageMovieConatiner list={slicedList} movies={movieMap} />}
				{viewType === ViewType.LIST && <ListMovieContainer list={slicedList} movies={movieMap} />}
				{viewType === ViewType.GRID && <GridMovieConatiner list={slicedList} movies={movieMap} />}
				{viewType === ViewType.BAR_GRAPH && <BarGraphConatiner list={slicedList} movies={movieMap}  />}
				{viewType === ViewType.RATING && <RatingConatiner list={slicedList} movies={movieMap}/>}

				<PageNav currPage={currPage} currPageSize={currPageSize} totalLength={sortedList.length}/>

			</div>
			<style jsx>{`
                h5{
                    text-align:left;
					font-size:15px;
                }
                `}</style>
		</>
	)
}
