import { SortType, STATE } from "./enum"

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
    countries:string,
    rtScore:string,
    rtState:string,
    rtAudienceScore:string,
    rtAudienceState:string,
    
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
    budget:number,
    runtime:number
}

type movieState={
    id:string,state:STATE,rank:number,extraData?:string|null,extraType?:SortType
}
interface MovieFilter{
    (movie:IMovie):boolean
}
interface MovieSorter{
    (movie1:IMovie,movie2:IMovie):number
}
export type { IMovie, IRank,graphMaxVals,movieState,MovieFilter,MovieSorter }
