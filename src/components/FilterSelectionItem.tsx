type Props={
    formtitle:string
    items:string[]
    defaultVal?:string
    formname?:string
}

export default function FilterSelectionItem({formtitle,items,defaultVal,formname}:Props){

    return (<div className="input-group selection filter-item">
    <label className="input-group-text" htmlFor={"inputGroup"+formtitle}>{formtitle}</label>
    <select className="form-select" name={formname?formname:formtitle} id={"inputGroup"+formtitle}>
        <option selected>{defaultVal?defaultVal:"All"}</option>
        {
            items.map((item)=>(
                <option value={item} key={item}>{item}</option>
            ))
        }
    </select>
</div>)
}