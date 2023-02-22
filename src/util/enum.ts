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
	RELEASE = "Recent",
	RELEASE_OLD = "Old",
	RATING_IMDB = "ImDB Rating(Decreasing)",
	RATING_IMDB_INC = "ImDB Rating(Increasing)",
	RATING_META = "Metacritic Rating(Decreasing)",
	RATING_META_INC = "Metacritic Rating(Increasing)",
	RUNNING_TIME = "Running Time(Decreasing)",
	RUNNING_TIME_INC = "Running Time(Increasing)",
	DM_GROSS_RATIO = "% Domestic Gross(Decreasing)",
	DM_GROSS_RATIO_INC = "% Domestic Gross(Increasing)",
	PROFIT = "% Profit(Decreasing)",
	PROFIT_INC = "% Profit(Increasing)",
	NONE = "none",
}
export enum STATE{
	NORMAL,ACTIVE,INACTIVE
}

export const sortTypeStr=[
	  "Worldwide Gross",
	  "Domestic Gross",
	  "International Gross",
	  "Production Budget",
	  "Recent",
	  "Old",
	  "ImDB Rating(Decreasing)",
	  "ImDB Rating(Increasing)",
	  "Metacritic Rating(Decreasing)",
	  "Metacritic Rating(Increasing)",
	  "Running Time(Decreasing)",
	  "Running Time(Increasing)",
	  "% Domestic Gross(Decreasing)",
	  "% Domestic Gross(Increasing)",
	"% Profit(Decreasing)",
	"% Profit(Increasing)",
]