export enum ViewType {
	BAR_GRAPH,
	GRAPH,
	LIST,
	GRID,
	IMAGE,
}
export enum FilterViewType {
	HIDE,
	HIGHLIGHT,
	CLASSIFY,
}
export enum FilterType {
	NONE,
	DIRECTOR,
	FRANCHISE,
	COUNTRY,
	IN_YEAR,
	UNTIL_YEAR,
	MONTH,
	ACTOR,
	COMPANY,
}
export enum SortType {
	WW_GROSS = "Worldwide Gross",
	DM_GROSS = "Domestic Gross",
	INTL_GROSS = "International Gross",
	BUDGET = "Production Budget",
	RELEASE = "Release Date",
	RATING_IMDB = "ImDB Rating",
	RATING_META = "Metacritic Rating",
	RUNNING_TIME = "Running Time",
	DM_GROSS_RATIO = "% Domestic Gross",
	NONE = "none",
}

export const sortTypeStr=["% Domestic Gross", "Running Time","Metacritic Rating","ImDB Rating","Worldwide Gross","Domestic Gross","International Gross", "Production Budget","Release Date",]