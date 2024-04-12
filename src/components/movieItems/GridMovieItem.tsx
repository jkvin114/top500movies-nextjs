import {  IMovie, movieState } from "@/util/types"
import { num2USD } from "@/util/util"
import { SortType } from "@/util/enum"
import Link from "next/link"
import { useRouter } from "next/router"

type Props={
    movie:IMovie|undefined
    state:movieState
}
export default function GridMovieItem({movie,state}:Props) {

    function onclick(){
        window.location.href=`/detail/`+movie?.id
    }
    function needExtra(){
        if(state.extraType==null) return false
        return ![SortType.WW_GROSS,SortType.RELEASE,SortType.RELEASE_OLD,SortType.RUNNING_TIME,SortType.RUNNING_TIME_INC,
        ].includes(state.extraType)
    }    
    const router=useRouter()

    function copy(id:string)
    {
        navigator.clipboard.writeText("\""+id+"\",");

    }
    return (<>
        {movie?(<>
        {/* <b onClick={()=>copy(movie.id)}>{movie.id}</b> */}
            <Link as={`/detail/`+movie?.id}
            href={{
            pathname: `/`,
            query: { ...router.query ,movieId:movie?.id},
        }} shallow={true} scroll={false}>
        <div className={`item ${state.state===0&&"bg-none border-0 "} ${state.state===1&&"active bg-body-secondary "} ${state.state===2&&"inactive "} card mb-3`}>
            <span className="badge bg-warning rounded-pill">{state.rank}</span>
        <div className={`row g-0`}>
          <div className="col-4">
            <img className="poster" src={movie.image} alt="poster"
			            />
          </div>
          <div className="col-8">
            <div className="card-body">
                <h6 className="card-subtitle movie-title">{movie.title}</h6>
                <div className="card-text">
                    <div>{movie.runtimeMins} mins</div>
                    <div className="card-text"><small>{movie.releaseDate} </small></div>
                </div>
            </div>
          </div>
        </div>
        <div className="row">
            <div className="card-text">
                <div>By {movie.director}</div>
                <div>Revenue: {num2USD(movie.worldwideGross)}</div>
                <div className="card-text"><small className="text-muted">{(state.extraData!=null&& needExtra())&&state.extraData} </small></div>
            </div>
        </div>
        
      </div></Link>
      </>
        // <div className={`item ${active?"active":"inactive"}`}><Link href={`/detail/`+movie.id}>
        //     <div>
        //         <div className="title">{movie.title}</div>
        //         <div className="content">
        //             <div>
        //             <Image src={movie.image} alt="poster"
		// 	            width={100} height={150}/>
        //             </div>
        //             <div>
        //                 <div>Release date: {movie.releaseDate}</div>
        //                 <div>Revenue: {num2USD(movie.worldwideGross)}</div>
        //                 <div>Director: {movie.director}</div>
        //                 <div>Runtime: {movie.runtimeMins} mins</div>
        //             </div>
        //         </div>
        //     </div>
        // </Link></div>
        ):""}
        <style jsx>{`
            .poster{
                width:80px;
                height:120px;
            }
            .item{
                position:relative;
                margin:3px;
                padding:5px;
                display:block;
                width:260px;
                cursor:pointer;
                filter:brightness(0.9);
            } .item.inactive{
                filter:brightness(0.7);
            }
            .badge{
                position:absolute;
                top:0;
                left:0;
                color:black;
            }
            
            .item.active{
                outline:2px solid whitesmoke;
            }
            .item.active{
            }
            .movie-title{
                font-weight:bold;
            }
			`}</style>
    </>)
}
/**
 * 
    <div className="card mb-3 bg-body-secondary">
        <div className="row g-0">
            <div className="col-md-4">
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    </div>
 */