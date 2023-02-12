import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
export default function ViewSelectionContainer(){

    const router=useRouter()
    const { view } = router.query

    return (<>
    <div className="filter-container bg-body-secondary">
        <div className="viewtype-item">

            <Link scroll={false} href={{ pathname: '/', query: {...router.query, view: "image"} }} className={"view-nav "+(view!=="image"? "inactive":"")}>
                <Image src="/image.svg" alt="image" width={30} height={30} /><text className="d-none d-sm-inline">Poster</text>
            </Link>
        </div>
        <div className="viewtype-item">

		<Link scroll={false} href={{ pathname: '/', query: {...router.query, view: "list"} }}className={"view-nav "+(view!=="list"? "inactive":"")}>
			<Image src="/list.svg" alt="list" width={30} height={30} /><text className="d-none d-sm-inline">List</text>
		</Link>
        </div>
        <div className="viewtype-item">

		<Link scroll={false} href={{ pathname: '/', query: {...router.query, view: "grid"} }} className={"view-nav "+(view!=="grid"? "inactive":"")}>
			<Image src="/grid.svg" alt="grid"  width={30} height={30}/><text className="d-none d-sm-inline">Grid</text>
		</Link>
        </div>

        <div className="viewtype-item">

		<Link scroll={false} href={{ pathname: '/', query: {...router.query, view: "bar_graph"} }} className={"view-nav "+(view!=="bar_graph"? "inactive":"")}>
			<Image src="/chart_white.svg" alt="bar_graph" width={30} height={30}/><text className="d-none d-sm-inline"  >Graph</text>
		</Link>
        </div>
        
    </div>
    <style jsx>
        {`
        .viewtype-item{
            padding:6px;
            display:inline-block;
            vertical-align:top;
        }
        .filter-container{
            text-align:center;
        }
        .filter-item{
            display:inline-block;
        }
        `}
        </style></>)
}