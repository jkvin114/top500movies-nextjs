
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
type Props={
    viewType:ViewType,
    allTimeRanks:string[],
    movies:IMovie[],
    page:number,
    pageSize:number
    
}

export default function MovieContainer({viewType,movies}:Props) {
    const [currPage,updatePage]=useState<number>(1)
    const [currPageSize,updatePageSize]=useState<number>(10)
    const [filter,setFilter]=useState<Filter>(new Filter())
    const [maxvals,setMaxvals]=useState<graphMaxVals>({
        wwgross:0,dmgross:0,runtime:0
    })
    function sortMovies(movies:IMovie[]):movieId[]{

        let sorted= new Filter()
        .setFilterView(FilterViewType.HIGHLIGHT).setFilter(FilterType.FRANCHISE)
        .setFilterStr("marvel").setSort1(SortType.WW_GROSS,-1).run(movies)
        let maxww=getMaxVal(sorted,(id:movieId)=>movieMap.get(id.id)?.worldwideGross)
        let maxdm=getMaxVal(sorted,(id:movieId)=>movieMap.get(id.id)?.domesticGross)
        let maxruntime=getMaxVal(sorted,(id:movieId)=>movieMap.get(id.id)?.runtimeMins)

        setMaxvals({...maxvals,wwgross:maxww,dmgross:maxdm,runtime:maxruntime})
        return sorted
    }
    function mapMovies(movies:IMovie[]):Map<string,IMovie>{
        let map=new Map<string,IMovie>()
        for(const m of movies){
            map.set(m.id,m)
        }
        return map
    }
    const router=useRouter()
    const {page,pagesize}=router.query
    useEffect(()=>{
        
	if(typeof page==="string")
        updatePage(Number(page))
    if(typeof pagesize==="string")
        updatePageSize(Math.min(Number(pagesize),50))
    },[page,pagesize,viewType])

    const movieMap=useMemo(()=>mapMovies(movies),[movies])
    const sortedList=useMemo(()=>sortMovies(movies),[movies])
    const slicedList=sortedList.slice((currPage-1)*currPageSize,currPage*currPageSize)


    return (<>
        
        <Link href={{ pathname: '/', query: { ...router.query,page: Math.max(1,currPage-1) ,pagesize:currPageSize} }}> <b>&#9664;</b>
</Link>
        <b>{currPage}</b>
        <Link href={{ pathname: '/', query: {...router.query, page: Math.min(currPage+1,Math.ceil(sortedList.length/currPageSize)) ,pagesize:currPageSize} }}
         > <b>&#9654;</b></Link>
        {viewType===ViewType.IMAGE && ( <ImageMovieConatiner list={slicedList} movies={movieMap}/>)}
        {viewType===ViewType.LIST && ( <ListMovieContainer list={slicedList} movies={movieMap}/>)}
        {viewType===ViewType.GRID && ( <GridMovieConatiner list={slicedList} movies={movieMap}/>)}
        {viewType===ViewType.BAR_GRAPH && ( <BarGraphConatiner list={slicedList} movies={movieMap} maxvals={maxvals}/>)}
   
    </>)
}