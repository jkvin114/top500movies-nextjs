import { ChangeEventHandler } from "react"

type Props={
    formtitle:string
    items:string[]
    defaultVal?:string
    formname?:string
    onChange?:ChangeEventHandler
}

export default function FilterSelectionItem({formtitle,items,defaultVal,formname,onChange}:Props){

    return (<div className="input-group selection filter-item">
    <label className="input-group-text" htmlFor={"inputGroup"+formtitle}>{formtitle}</label>
    <select onChange={onChange&&onChange} className="form-select" name={formname?formname:formtitle} id={"inputGroup"+formtitle}>
        <option defaultValue={defaultVal?defaultVal:"All"}>{defaultVal?defaultVal:"All"}</option>
        {
            items.map((item)=>(
                <option value={item} key={item}>{item}</option>
            ))
        }
    </select>
</div>)
}