import { graphMaxVals, IMovie, movieState } from "@/util/types"
import GraphSelectionContainer from "../GraphSelectionContainer"
import BarGraphMovieItem from "../movieItems/BarGraphMovieItem"
import GridMovieItem from "../movieItems/GridMovieItem"
import { Chart, ChartTypes } from "charts-css-react"
import { useEffect, useState } from "react"
import { GraphType } from "@/util/enum"
import { title } from "process"
import { extractNumber, getMaxVal, isValidCurrency } from "@/util/util"

type Props = {
	list: movieState[]
	movies: Map<string, IMovie>
}
type MovieValue = {
	title: string
	values: number[]
}

export default function BarGraphConatiner({ list, movies }: Props) {
	const [type, setType] = useState<GraphType>(GraphType.WW_GROSS)
	const [maxval, setMaxval] = useState<number>(Infinity)
	const [movieValues, setMovieValues] = useState<MovieValue[]>([])
	const [color, setColor] = useState<string>("#FF5555")
	const [scale, setScale] = useState<number>(1)
	
	useEffect(() => {
		if (type === GraphType.WW_GROSS || type === GraphType.DOM_INTL_GROSS) {
			setMaxval(getMaxVal(list, (state: movieState) => movies.get(state.id)?.worldwideGross))
		}
		if (type === GraphType.BUDGET) {
			setMaxval(getMaxVal(list, (state: movieState) => {
				const movie=movies.get(state.id)
				if(!movie || extractNumber(movie.budget)===-1) return -1

				if(isValidCurrency(movie.budget)){
					return extractNumber(movie.budget)
				}
				return -1
		}))
		}
		if (type === GraphType.RUNNING_TIME) {
			setMaxval(getMaxVal(list, (state: movieState) => movies.get(state.id)?.runtimeMins))
		}
		setMovieValues(
			list.map((mv) => {
				let value = [0]
				const movie = movies.get(mv.id)
				if (!movie) return { title: "", values: [0] }

				if (type === GraphType.WW_GROSS) {
					setColor("#5E35B1")
					value[0] = movie.worldwideGross
				}
				if (type === GraphType.DOM_INTL_GROSS) {
					setColor("#E53935")
					value = [movie.domesticGross, movie.worldwideGross - movie.domesticGross]
				}
				if (type === GraphType.BUDGET) {
					setColor("#F57C00")
					let b = extractNumber(movie.budget)
					if (isValidCurrency(movie.budget) && b !== -1) {
						value[0] = b
					}
				}
				if (type === GraphType.RUNNING_TIME) {
					setColor("#009688")
					value[0] = movie.runtimeMins
				}
				return { title: movie.title, values: value }
			})
		)
	}, [type, list])
	return (
		<>
			<GraphSelectionContainer type={type} setType={setType} />
			<div className="chart-wrapper">
				<Chart type={"bar"} hideData showDataOnHover stacked multiple>
					{movieValues.map(
						(mv, i) =>
							list.length > i && (
								<BarGraphMovieItem
									key={list[i].id}
									title={mv.title}
									maxval={maxval}
									state={list[i].state}
									scale={scale}
									graphType={type}
									graphValue={mv.values}
									color={color}
								/>
							)
					)}
				</Chart>
			</div>
			<style jsx>{`
				.chart-wrapper {
				}
			`}</style>
		</>
	)
}
