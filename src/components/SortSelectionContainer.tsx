import { SortType, sortTypeStr } from "@/util/enum";
import { Filter } from "@/util/util";
import { useRouter } from "next/router";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
type Props={
    setFilter:Dispatch<SetStateAction<Filter>>
    oldFilter:Filter
}
export function SortSelection({setFilter,oldFilter}:Props){
    const [sortType,setSortType]=useState<string>("Worldwide Gross")
    const router=useRouter()
    
    function changeSort(event:FormEvent<HTMLSelectElement>){
        setSortType(event.currentTarget.value)
        let filter=oldFilter.clone().setSort1(event.currentTarget.value as SortType,-1)
        setFilter(filter)
        router.push({
            pathname: '/',
            query: {...router.query, page:1 }
          },undefined, { shallow: true })
    }

    return (<><div className=" filter-item">

        <div className="input-group selection">
            <label className="input-group-text" htmlFor="input-sortby">Sort by</label>
            <select className="form-select" id="input-sortby" name="sortby" onChange={changeSort}>
            {
                sortTypeStr
                .map((name)=>
                    (<option value={name} key={name} selected={sortType===name}>{name}</option>)
                )
            }
                
            </select>
        </div>

    </div><style jsx>
        {`
            .filter-item{
                display:inline-block;
            }
        `}</style></>)
}