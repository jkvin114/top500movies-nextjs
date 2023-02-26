export enum ViewType {
	BAR_GRAPH,
	GRAPH,
	LIST,
	GRID,
	IMAGE,
	RATING
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
export enum GraphType{
	WW_GROSS="Worldwide Gross",
	DOM_INTL_GROSS="Domestic & International Gross",
	BUDGET="Production Budget",
	RUNNING_TIME="Runnning Time"
}
export const GraphTypeStr=[
	"Worldwide Gross",
	"Domestic & International Gross",
	"Production Budget",
	"Runnning Time"
]
export enum SortType {
	WW_GROSS = "Worldwide Gross",
	DM_GROSS = "Domestic Gross",
	INTL_GROSS = "International Gross",
	BUDGET = "Production Budget",
	RELEASE = "Recent",
	RELEASE_OLD = "Old",
	RUNNING_TIME = "Running Time(Decreasing)",
	RUNNING_TIME_INC = "Running Time(Increasing)",
	DM_GROSS_RATIO = "% Domestic Gross(Decreasing)",
	DM_GROSS_RATIO_INC = "% Domestic Gross(Increasing)",
	PROFIT = "% Profit(Decreasing)",
	PROFIT_INC = "% Profit(Increasing)",
	RATING_IMDB = "ImDB Rating(Decreasing)",
	RATING_IMDB_INC = "ImDB Rating(Increasing)",
	RATING_META = "Metacritic Rating(Decreasing)",
	RATING_META_INC = "Metacritic Rating(Increasing)",
	RATING_RT = "Rottentomatoes Tomatometer(Decreasing)",
	RATING_RT_INC = "Rottentomatoes Tomatometer(Increasing)",
	RATING_RT_AUDIENCE = "Rottentomatoes Audience(Decreasing)",
	RATING_RT_AUDIENCE_INC = "Rottentomatoes Audience(Increasing)",
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
	  "Running Time(Decreasing)",
	  "Running Time(Increasing)",
	  "% Domestic Gross(Decreasing)",
	  "% Domestic Gross(Increasing)",
	"% Profit(Decreasing)",
	"% Profit(Increasing)",
	"ImDB Rating(Decreasing)",
	"ImDB Rating(Increasing)",
	"Metacritic Rating(Decreasing)",
	"Metacritic Rating(Increasing)",
	"Rottentomatoes Tomatometer(Decreasing)",
	"Rottentomatoes Tomatometer(Increasing)",
	"Rottentomatoes Audience(Decreasing)",
	"Rottentomatoes Audience(Increasing)",
]