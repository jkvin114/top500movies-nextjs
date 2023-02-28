import Image from "next/image"
import FilterSelectionItem from "./FilterSelectionItem"
import { Filter } from "@/util/util"

import { FilterType, FilterViewType, SortType, sortTypeStr } from "@/util/enum"
import {
	ChangeEvent,
	ChangeEventHandler,
	Dispatch,
	FormEvent,
	InputHTMLAttributes,
	SetStateAction,
	useEffect,
	useState,
} from "react"
import { useRouter } from "next/router"
import { FRANCHISE_NAMES } from "@/util/franchiseData"
type Props = {
	directors: string[]
	actors: string[]
	companies: string[]
	setFilter: Dispatch<SetStateAction<Filter>>
	oldFilter: Filter
}
type dim = {
	width: number
	height: number
}

export default function FilterContainer({ directors, actors, companies, setFilter, oldFilter }: Props) {
	const router = useRouter()
	const [yearOption, setYearOption] = useState<string>("in")
	const [filterViewOption, setFilterViewOption] = useState<string>("hide")
	const [isPortrait, setPortrait] = useState<boolean>(false)
	const [isFilterVisible, setFilterVisibility] = useState<boolean>(false)
	const size=useWindowSize()


	function onSubmit(event: any) {
		event.preventDefault()
		// const sorttype=event.target.sort_type.value==="increase"?1:-1
		// const sort=event.target.sortby.value==="None"?SortType.WW_GROSS:event.target.sortby.value
		let filter = oldFilter.clone()
		filter.resetFilter()
		if (event.target.year.value !== "") {
			if (event.target.year_type.value === "until") {
				filter.addFilter(FilterType.UNTIL_YEAR, Number(event.target.year.value))
			} else {
				filter.addFilter(FilterType.IN_YEAR, Number(event.target.year.value))
			}
		}
		if (event.target.search.value !== "") {
			filter.addFilter(FilterType.SEARCH, event.target.search.value)
		}
		if (event.target.usa_only.checked) filter.addFilter(FilterType.COUNTRY, "USA")

		if (event.target.filter_view.value === "highlight") {
			filter.setFilterView(FilterViewType.HIGHLIGHT)
		} else if (event.target.filter_view.value === "category") {
			filter.setFilterView(FilterViewType.CLASSIFY)
		} else {
			filter.setFilterView(FilterViewType.HIDE)
		}
		if (event.target.month.value !== "All") filter.addFilter(FilterType.MONTH, Number(event.target.month.value))
		if (event.target.Actor.value !== "All") filter.addFilter(FilterType.ACTOR, String(event.target.Actor.value))
		if (event.target.Director.value !== "All")
			filter.addFilter(FilterType.DIRECTOR, String(event.target.Director.value))
		if (event.target.series.value !== "All") filter.addFilter(FilterType.FRANCHISE, String(event.target.series.value))
		if (event.target.Company.value !== "All") filter.addFilter(FilterType.COMPANY, String(event.target.Company.value))

		router.push(
			{
				pathname: "/",
				query: { ...router.query, page: 1 },
			},
			undefined,
			{ shallow: true }
		)
		setFilter(filter)
		toggleFilter()
		return false
	}
	function onreset() {
		;(document.getElementById("filterform") as any)?.reset()
		// setFilter(new Filter().setSort1(oldFilter.sort1, -1))
		return
	}

	// custom Hook to catch viewport size change
	function useWindowSize() {
		// Initialize state with undefined width/height so server and client renders match
		// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
		const [windowSize, setWindowSize] = useState<dim>({
			width: 1,
			height: 1,
		})
		useEffect(() => {
			// Handler to call on window resize
			function handleResize() {
				if (window.matchMedia("(orientation: portrait)").matches) {
					setPortrait(true)
				} else {
					setPortrait(false)
				}

				// Set window width/height to state
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
				})
			}
			// Add event listener
			window.addEventListener("resize", handleResize)
			// Call handler right away so state gets updated with initial window size
			handleResize()
			// Remove event listener on cleanup
			return () => window.removeEventListener("resize", handleResize)
		}, [])
		return windowSize
	}

	function changeYearType(event: ChangeEvent<HTMLInputElement>) {
		setYearOption(event.target.value)
	}
	function changeFilterView(event: ChangeEvent<HTMLInputElement>) {
		setFilterViewOption(event.target.value)
	}
	function toggleFilter() {
		if (isFilterVisible) {
			document.body.style.overflow = "auto"
		} else if (isPortrait) {
			document.body.style.overflow = "hidden"
		}
		setFilterVisibility(!isFilterVisible)
	}
	useEffect(() => {
		if (window.matchMedia("(orientation: portrait)").matches) {
			setPortrait(true)
		} else {
			setPortrait(false)
		}
	}, [])
	return (
		<div className="container">
			{isPortrait && (
				<button onClick={toggleFilter} className="filter-toggle-btn btn btn-secondary bg-body-secondary" type="button">
					<Image src="/filter.svg" width={30} height={30} alt="" />
					Filters
				</button>
			)}

			<div className={`filter-container bg-body-secondary ${isPortrait && "portrait"} ${!isFilterVisible && "hidden"}`}>
				{isPortrait ? (
					<h5 onClick={toggleFilter}>
						Filters
						<strong className="close-filter" onClick={toggleFilter}>
							&times;
						</strong>
					</h5>
				) : (
					<h5 className="filter-toggler" data-bs-toggle="collapse" data-bs-target="#filter-content">
						<Image src="/filter.svg" width={30} height={30} alt="" />
						Filters
					</h5>
				)}

				<form onSubmit={onSubmit} id="filterform">
					<div className={`filter-content ${!isPortrait && "collapse"}`} id="filter-content">
						<FilterSelectionItem formtitle="Director" items={directors} />
						<FilterSelectionItem formtitle="Series/Franchise(Beta)" items={FRANCHISE_NAMES} formname="series" />
						<FilterSelectionItem formtitle="Company" items={companies} />
						<FilterSelectionItem formtitle="Actor" items={actors} />
						<FilterSelectionItem
							formtitle="Release Month"
							items={[...new Array<number>(12)].map((e, i) => String(i + 1))}
							formname="month"
						/>

						<div className="form-floating filter-item">
							<input type="number" name="year" className="form-control" id="input-year" placeholder="year" />
							<label htmlFor="input-year">Year</label>
							<div className="form-check-inline">
								<input
									onChange={changeYearType}
									className="form-check-input"
									type="radio"
									name="year_type"
									value="until"
									id="input-until-year"
									checked={yearOption === "until"}
								/>
								<label className="form-check-label" htmlFor="input-until-year">
									Until year
								</label>
							</div>
							<div className="form-check-inline">
								<input
									onChange={changeYearType}
									className="form-check-input"
									type="radio"
									name="year_type"
									value="in"
									id="input-in-year"
									checked={yearOption === "in"}
								/>
								<label className="form-check-label" htmlFor="input-in-year">
									In year
								</label>
							</div>
						</div>
						<div className="form-floating filter-item">
							<input type="text" name="search" className="form-control" id="input-search" placeholder="search" />
							<label htmlFor="input-search">Search by title</label>
						</div>
						<div className="form-check form-switch filter-item">
							<input className="form-check-input" name="usa_only" type="checkbox" id="input-usa-only" value="usonly" />
							<label className="form-check-label" htmlFor="input-usa-only">
								USA movies only
							</label>
						</div>

						<div className="filter-item">
							<Image src="/filter.svg" width={30} height={30} alt="view" className="m-1" />
							<div className="form-check-inline">
								<input
									onChange={changeFilterView}
									className="form-check-input"
									type="radio"
									name="filter_view"
									value="hide"
									id="input-view-hide"
									checked={filterViewOption === "hide"}
								/>
								<label className="form-check-label" htmlFor="input-view-hide">
									Hide
								</label>
							</div>
							<div className="form-check-inline">
								<input
									onChange={changeFilterView}
									className="form-check-input"
									type="radio"
									name="filter_view"
									value="highlight"
									id="input-view-highlight"
									checked={filterViewOption === "highlight"}
								/>
								<label className="form-check-label" htmlFor="input-view-highlight">
									Highlight
								</label>
							</div>
							{/* <div className="form-check-inline">
                <input onChange={changeFilterView}  className="form-check-input" type="radio" name="filter_view" value="category" id="input-view-category"checked={filterViewOption==="category"}/>
                <label className="form-check-label" htmlFor="input-view-category">
                    Category
                </label>
                </div> */}
						</div>

						<div className="filter-item btn-container">
							<button type="button" className="btn btn-secondary" onClick={onreset}>
								Clear
							</button>
							<button type="submit" className="btn btn-primary">
								Apply
							</button>
						</div>
					</div>
				</form>
			</div>
			<style jsx>
				{`
					.filter-toggle-btn {
					}
					.filter-toggler {
						display: block;
						text-align: center;
					}
					.close-filter {
						float: right;
						font-size: 25px;
					}
					.filter-container.portrait {
						position: fixed;
						top: 0;
						left: 0;
						width: fit-content;
						height: fit-content;
						z-index: 99;    
						max-height: 90vh;
    					overflow: auto;
					}
					.filter-container.portrait.hidden {
						visibility: collapse;
					}
					.card {
						max-width: 400px;
						height: 200px;
					}
					button {
						margin: 5px;
					}
					.btn-container {
						flex-grow: 1;
						text-align: right;
					}
					h5 {
						cursor: pointer;
						display: block;
					}
				`}
			</style>
		</div>
	)
}
