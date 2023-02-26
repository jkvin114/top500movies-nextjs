import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
export default function ViewSelectionContainer(){

    const router=useRouter()
    const { view } = router.query

    return (<>
    <div className="filter-container bg-body-secondary">
        
        <div  className={`viewtype-item view-nav ${(view==="list"||!view? "bg-secondary":" inactive")}`}>

    <Link scroll={false} href={{ pathname: '/', query: {...router.query, view: "list"} }}>
        <Image src="/list.svg" alt="list" width={30} height={30} />
    </Link>
    </div>
        <div className={`viewtype-item view-nav ${(view!=="image"? "inactive":" bg-secondary")}`}>
            
            <Link scroll={false} href={{ pathname: '/', query: {...router.query, view: "image"} }} >
                <Image src="/image.svg" alt="image" width={30} height={30} />
                {/* <text className="d-none d-sm-inline">Poster</text> */}
            </Link>
        </div>
        <div  className={`viewtype-item view-nav ${(view!=="grid"? "inactive":" bg-secondary")}`}>

		<Link scroll={false} href={{ pathname: '/', query: {...router.query, view: "grid"} }} >
			<Image src="/grid.svg" alt="grid"  width={30} height={30}/>
		</Link>
        </div>

        <div  className={`viewtype-item view-nav ${(view!=="bar_graph"? "inactive":" bg-secondary")}`}>

		<Link scroll={false} href={{ pathname: '/', query: {...router.query, view: "bar_graph"} }} >
			<Image src="/chart_white.svg" alt="bar_graph" width={30} height={30}/>
		</Link>
        </div>
        <div  className={`viewtype-item view-nav ${(view!=="rating"? "inactive":" bg-secondary")}`}>

		<Link scroll={false} href={{ pathname: '/', query: {...router.query, view: "rating"} }} >
			<Image src="/star.svg" alt="rating" width={30} height={30}/>
		</Link>
        </div>
    </div>
    <style jsx>
        {`
        .viewtype-item{
            padding:6px;
            display:inline-block;
            vertical-align:top;
            border-radius:4px;
        }
        .viewtype-item.active{
            background:$gray-700;
        }
        .filter-container{
            text-align:center;
            display:inline-block;
        }
        .filter-item{
            display:inline-block;
        }
        `}
        </style></>)
}