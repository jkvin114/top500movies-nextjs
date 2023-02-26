import { GraphType, GraphTypeStr } from "@/util/enum"
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react"
import FilterSelectionItem from "./FilterSelectionItem"
type Props={
    type:GraphType
    setType:Function
}

export default function GraphSelectionContainer({type,setType}:Props){
    function onChange(event:ChangeEvent<HTMLSelectElement>){
        setType(event.currentTarget.value as GraphType)

    }
    return (<>            
        <FilterSelectionItem formtitle="Values" items={GraphTypeStr} 
        defaultVal={type} formname="graphtype" onChange={onChange as ChangeEventHandler}/>

        <style jsx>{`
            .filter-item{
                min-width:200px;
            }
            h5{
                cursor:pointer;
            }
            `}
        </style>
    </>)
}