
type IMovie = {
    id: string,
    title:string,
    fullTitle:string,
    year:string,
    image:string,
    releaseDate:string,
    runtimeMins:number,
    director:string,
    actors:string[],
    companies:string[],
    budget:string,
    imDbRating:string,
    metacriticRating:number,
    worldwideGross:number,
    domesticGross:number,
    domesticOpening:number,
    contentRating:string,
    countries:string
}
type IRank = {
    id: string,
    rank: number,
    title:string,
    year:number,
    worldwideGross:number,
    domesticGross:number,
    internationalGross:number,
    hasRecentData:boolean
}
type IImageMovieItem={
    id:string,
    image:string,
    title:string
}
type IListMovieItem={
    id:string,
    title:string,
    year:string,
    releaseDate:string,
    runtimeMins:number,
    director:string,
    budget:string,
    imDbRating:string,
    metacriticRating:number,
    worldwideGross:number,
    domesticGross:number,
    domesticOpening:number,
    contentRating:string,
}
type IBarGraphMovieItem={
    id:string,
    title:string,
    runtimeMins:number,
    worldwideGross:number,
    domesticGross:number,
    internationalGross:number,
    domesticOpening:number,
    budget:string,
    imDbRating:string,
    metacriticRating:number,
}
type graphMaxVals={
    wwgross:number,
    dmgross:number
}

export type { IMovie, IRank,IImageMovieItem,IBarGraphMovieItem,IListMovieItem,graphMaxVals }
