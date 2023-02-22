import { STATE } from "./enum"

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
type graphMaxVals={
    wwgross:number,
    dmgross:number,
    runtime:number
}

type movieId={
    id:string,state:STATE,rank:number
}
interface MovieFilter{
    (movie:IMovie):boolean
}
interface MovieSorter{
    (movie1:IMovie,movie2:IMovie):number
}
export type { IMovie, IRank,graphMaxVals,movieId,MovieFilter,MovieSorter }
