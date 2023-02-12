import Image from "next/image"
import FilterSelectionItem from "./FilterSelectionItem"
import { Filter, FRANCHISE_NAMES } from "@/util/util"
import { FilterType, FilterViewType, SortType, sortTypeStr } from "@/util/enum"
import { Dispatch, FormEvent, SetStateAction } from "react"
import { useRouter } from "next/router"
type Props={
    directors:string[]
    actors:string[]
    companies:string[]
    setFilter:Dispatch<SetStateAction<Filter>>
}

export default function FilterContainer({directors,actors,companies,setFilter}:Props) {
    const router=useRouter()

    function onSubmit(event:any ){
        event.preventDefault()
        const sorttype=event.target.sort_type.value==="increase"?1:-1
        const sort=event.target.sortby.value==="None"?SortType.WW_GROSS:event.target.sortby.value
        let filter=new Filter().setSort1(sort,sorttype)
       
        if(event.target.year.value!==""){
            if(event.target.year_type.value==="until"){
                filter.addFilter(FilterType.UNTIL_YEAR,Number(event.target.year.value))
            }
            else{
                filter.addFilter(FilterType.IN_YEAR,Number(event.target.year.value))
            }
        }
        if(event.target.usa_only.checked) filter.addFilter(FilterType.COUNTRY,"USA")

        if(event.target.filter_view.value==="highlight"){
            filter.setFilterView(FilterViewType.HIGHLIGHT)
        }
        else if(event.target.filter_view.value==="category"){
            filter.setFilterView(FilterViewType.CLASSIFY)
        }
        else{
            filter.setFilterView(FilterViewType.HIDE)
        }
        if(event.target.month.value!=="All") filter.addFilter(FilterType.MONTH,Number(event.target.month.value))
        if(event.target.Actor.value!=="All") filter.addFilter(FilterType.ACTOR,String(event.target.Actor.value))
        if(event.target.Director.value!=="All") filter.addFilter(FilterType.DIRECTOR,String(event.target.Director.value))
        if(event.target.series.value!=="All") filter.addFilter(FilterType.FRANCHISE,String(event.target.series.value))
        if(event.target.Company.value!=="All") filter.addFilter(FilterType.COMPANY,String(event.target.Company.value))

        router.push({
            pathname: '/',
            query: {...router.query, page:1 }
          },undefined, { shallow: true })
        setFilter(filter)
        return false
    }
    function onreset(){
        (document.getElementById("filterform") as any)?.reset()
    }
    return (<><div className="filter-container bg-body-secondary">
        <h5 data-bs-toggle="collapse" data-bs-target="#filter-content" ><Image src="/filter.svg" width={30} height={30} alt=""/>Filters

        </h5> <form onSubmit={onSubmit} id="filterform">
        <div className="filter-content collapse" id="filter-content">
           
            <FilterSelectionItem formtitle="Director" items={directors}/>
            <FilterSelectionItem formtitle="Series/Franchise" items={FRANCHISE_NAMES} formname="series"/>
            <FilterSelectionItem formtitle="Company" items={companies}/>
            <FilterSelectionItem formtitle="Actor" items={actors}/>
            <FilterSelectionItem formtitle="Release Month" items={[...new Array<number>(12)].map((e,i)=>String(i+1))}  formname="month"/>

            <div className="form-floating filter-item">
                <input type="number" name="year" className="form-control" id="input-year" placeholder="year"
            />
                <label htmlFor="input-year">Year</label>
                <div className="form-check-inline">
                    <input className="form-check-input" type="radio" name="year_type" value="until" id="input-until-year"/>
                    <label className="form-check-label" htmlFor="input-until-year">
                        Until year
                    </label>
                    </div>
                    <div className="form-check-inline">
                    <input className="form-check-input" type="radio" name="year_type" value="in" id="input-in-year"/>
                    <label className="form-check-label" htmlFor="input-in-year">
                        In year
                    </label>
                </div>
            </div>
            
            <div className="form-check form-switch filter-item">
                <input className="form-check-input" name="usa_only" type="checkbox" id="input-usa-only" value="usonly"/>
                <label className="form-check-label" htmlFor="input-usa-only">USA movies only</label>
            </div>
           
        <div className="filter-item">
        <Image src="/filter.svg" width={30} height={30} alt="view" className="m-1"/>
            <div className="form-check-inline">
                
                <input className="form-check-input" type="radio" name="filter_view" value="hide" id="input-view-hide"/>
                <label className="form-check-label" htmlFor="input-view-hide">
                    Hide
                </label>
                </div>
                <div className="form-check-inline">
                <input className="form-check-input" type="radio" name="filter_view" value="highlight" id="input-view-highlight" />
                <label className="form-check-label" htmlFor="input-view-highlight">
                    Highlight
                </label>
                </div>
                <div className="form-check-inline">
                <input className="form-check-input" type="radio" name="filter_view" value="category" id="input-view-category"/>
                <label className="form-check-label" htmlFor="input-view-category">
                    Category
                </label>
                </div>
            </div>
            
        <div className=" filter-item">

            <div className="input-group selection">
                <label className="input-group-text" htmlFor="input-sortby">Sort by</label>
                <select className="form-select" id="input-sortby" name="sortby">
                <option selected>None</option>
                {
                    sortTypeStr
                    .map((name)=>
                        (<option value={name} key={name}>{name}</option>)
                    )
                }
                    
                </select>
            </div>
        
            <div className="form-check-inline">
                <input className="form-check-input" type="radio" name="sort_type" value="increase" id="input-sort-increase"/>
                <label className="form-check-label" htmlFor="input-sort-increase">
                    Increasing
                </label>
                </div>
                <div className="form-check-inline">
                <input className="form-check-input" type="radio" name="sort_type" value="decrease" id="input-sort-decrease" />
                <label className="form-check-label" htmlFor="input-sort-decrease">
                    Decreasing
                </label>
            </div>
        </div>
        <div className="filter-item btn-container">
            <button type="button"  className="btn btn-secondary" onClick={onreset}>Reset</button>
            <button type="submit" className="btn btn-primary">Apply</button>
        </div>
       
        </div>
        </form>
    </div>
    <style jsx>
        {`
        .card{
            max-width:400px;
            height:200px;
        }
        button{
            margin:5px;
        }
        .btn-container{
            flex-grow:1;
            text-align:right;
        }
        h5{
            cursor:pointer;
            display:inline-block;
        }
        `}
    </style>
</>)
}