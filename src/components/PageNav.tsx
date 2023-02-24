import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEventHandler, FormEvent, useState } from "react";

type Prop={
    currPage:number,currPageSize:number,totalLength:number
}
export default function PageNav({currPage,currPageSize,totalLength}:Prop){
    const router=useRouter()

    const [pagesize,setPagesize]=useState<number>(10)
    function pageChange(e:FormEvent<HTMLSelectElement>){
        let pg=e.currentTarget.value
        setPagesize(Number(pg))
        router.push({
            pathname: '/',
            query: {...router.query, pagesize:pg }
          },undefined, { shallow: true })
    }
    return (<><div className="page-nav-container">
        <nav>
            <ul className="pagination">{
                (<li className="page-item">
                    <Link className="page-link"
                        scroll={true}
                        href={{
                            pathname: "/",
                            query: { ...router.query, page:1, pagesize: currPageSize },
                        }}
                    >
                        <b>&laquo;</b>
                    </Link>
                </li>)
            }
            
                <li className="page-item">
                    {" "}
                    <Link className="page-link"
                    scroll={true}
                        href={{
                            pathname: "/",
                            query: { ...router.query, page: Math.max(1, currPage - 1), pagesize: currPageSize },
                        }}
                    >
                        {" "}
                        <b>&#9664;</b>
                    </Link>
                </li>
                {
                    [...Array(Math.ceil(totalLength / currPageSize)+1)].map((e, i) =>(
                        
                    (i>0 && i>Math.floor((currPage-1)/5)*5 && i<=Math.ceil((currPage)/5)*5)&&(<li key={i} className={"page-item "+(currPage==i&&"active")}>
                        <Link className="page-link" scroll={true} href={{
                            pathname: "/",
                            query: {
                                ...router.query,
                                page: i,
                                pagesize: currPageSize,
                            },
                        }}>{i}</Link>
                    </li>) ))

                }
                <li className="page-item">
                    <Link
                        className="page-link" scroll={true}
                        href={{
                            pathname: "/",
                            query: {
                                ...router.query,
                                page: Math.min(currPage + 1, Math.ceil(totalLength / currPageSize)),
                                pagesize: currPageSize,
                            },
                        }}
                    >
                        {" "}
                        <b>&#9654;</b>
                    </Link>
                </li>
            </ul>
        </nav>
        <div className="input-group selection">
            <label className="input-group-text" htmlFor={"inputGroup # items"}># items</label>
            <select defaultValue={String(pagesize)} className="form-select" id={"inputGroup # items"} onChange={pageChange}>
                {
                    ["5","10","20","50"].map((item)=>(
                        <option  value={item} key={item} >{item}</option>
                    ))
                }
            </select>
        </div>

        </div>
        <style jsx>
            {`
                .pagination{
                    margin-bottom:0;
                }
                .selection{
                    max-width:300px;
                    margin-left:10px;
                }
                .page-nav-container{
                    margin-top:20px;
                    margin-bottom:20px;
                }
            `}
            </style></>
    )
}