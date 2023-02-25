import {  IMovie, movieState } from "@/util/types"
import { num2USD } from "@/util/util"
import { SortType } from "@/util/enum"
import Image from "next/image"
type Props={
    movie:IMovie|undefined
    state:movieState
}
export default function RatingMovieItem({movie,state}:Props) {

    function onclick(){
        window.location.href=`/detail/`+movie?.id
    }
    function needExtra(){
        if(state.extraType==null) return false
        return ![SortType.RATING_IMDB,SortType.RATING_IMDB_INC,SortType.RATING_META,SortType.RATING_META_INC,SortType.RELEASE,SortType.RELEASE_OLD
            ,SortType.RATING_RT_INC,SortType.RATING_RT,SortType.RATING_RT_AUDIENCE,SortType.RATING_RT_AUDIENCE_INC]
            .includes(state.extraType)
    }
    function getValue(str:string|number|undefined):number{
        if(str==="" || !str) return -1
        return Number(str)
    }
    const meta=getValue(movie?.metacriticRating)
    const imdb=getValue(movie?.imDbRating)
    const tomato=getValue(movie?.rtScore)
    const tomato_aud=getValue(movie?.rtAudienceScore)
    return (<>
        {movie?(
        <div onClick={onclick} className={`item ${state.state===0&&"bg-body-secondary "} ${state.state===1&&"active bg-body-secondary "} ${state.state===2&&"inactive "} card mb-3`}>
            <span className="badge bg-warning rounded-pill">{state.rank}</span>
        <div className={`row g-0 header`}>
            <div className="card-body">
                <h6 className="card-subtitle movie-title">{movie.title}</h6>
                <div className="card-text">
                    <small className="text-muted">{movie.releaseDate} </small>
                    <div className="card-text"><small className="text-muted">{(state.extraData!=null&& needExtra())&&state.extraData} </small></div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <div className="rating">
                     {/* <Image title="metacritic score" className="icon" src="/metacritic.svg" alt="metacritic" width={30} height={30} /> */}
                     <span title="metacritic score"  className={`metascore ${(meta<0)&& "gray"} 
                     ${(meta>=0 && meta <=40)&& "red"} 
                     ${(meta>40 && meta <=60)&& "yellow"} 
                     `}>{meta===-1?"-":meta} </span>
                </div>
                <div className="rating">
                    {(movie.rtState===""||!movie.rtState) 
                    && ( <> <Image title="Tomatometer" className="icon grayscale" src="/rt-fresh.png" alt="Tomatometer" width={35} height={35} />
                        <b title="Tomatometer" className="rottentomato"> - </b></>)
                    }
                    {(movie.rtState==="rotten") 
                    && ( <> <Image title="Tomatometer" className="icon" src="/rt-rotten.png" alt="Tomatometer" width={35} height={35} />
                        <b title="Tomatometer" className="rottentomato">{tomato}%</b></>)
                    }
                    {(movie.rtState==="fresh") 
                    && ( <> <Image title="Tomatometer" className="icon" src="/rt-fresh.png" alt="Tomatometer" width={35} height={35} />
                        <b title="Tomatometer" className="rottentomato">{tomato}%</b></>)
                    }
                    {(movie.rtState==="certified-fresh") 
                    && ( <> <Image title="Tomatometer" className="icon" src="/rt-certified-fresh.png" alt="Tomatometer" width={35} height={35} />
                        <b title="Tomatometer" className="rottentomato">{tomato}%</b></>)
                    }

                </div>
            </div>
            <div className="col-6">
                <div className="rating">
                    <Image title="ImDB rating" className="icon" src="/star.png" alt="metacritic" width={20} height={20} />
                    <span title="ImDB rating" className="imdbscore">{imdb===-1?"N/A":imdb+" / 10"} </span>
                </div>
                <div className="rating">
                    {(movie.rtAudienceState===""||!movie.rtAudienceState) 
                        && ( <> <Image title="RT audience" className="icon grayscale" src="/rt-audience-upright.png" alt="Tomatometer" width={25} height={35} />
                            <b title="RT audience" className="rottentomato"> - </b></>)
                        }
                        {(movie.rtAudienceState==="spilled") 
                        && ( <> <Image title="RT audience" className="icon" src="/rt-audience-spilled.png" alt="Tomatometer" width={35} height={25} />
                            <b title="RT audience" className="rottentomato">{tomato_aud}%</b></>)
                        }
                        {(movie.rtAudienceState==="upright") 
                        && ( <> <Image title="RT audience" className="icon" src="/rt-audience-upright.png" alt="Tomatometer" width={25} height={35} />
                            <b title="RT audience" className="rottentomato">{tomato_aud}%</b></>)
                        }
                </div>
            </div>
        </div>
      </div>
        ):""}
        <style jsx>{`
            .rottentomato{
                margin-left:4px;
                font-size:20px;
                color:whitesmoke;
            }
            .imdbscore{
                margin-left:4px;
                vertical-align: middle;
                color:whitesmoke;

            }
            .header{
                min-height:90px;
            }
            .metascore{
                margin-left:4px;
                display: inline-block;
                color:white;
                background:#66CC33;
                font-weight:bold;
                width:35px;
                height:35px;
                border-radius:4px;
                line-height:35px;
                text-align:center;
            }
            .metascore.gray{
                background:#AAAAAA;
            }
            .metascore.red{
                background:red;
            }
            .metascore.yellow{
                background:#FFCC33;
            }
            .icon{
                display:inline;
            }
            .rating{
                min-height:50px;
                text-align:center;
            }
            .item{
                position:relative;
                margin:3px;
                padding:5px;
                display:block;
                width:250px;
                cursor:pointer;
                {/* flex-grow:1; */}
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
                color:whitesmoke;

                font-weight:bold;
            }
			`}</style>
    </>)
}