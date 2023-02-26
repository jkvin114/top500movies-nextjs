import { IMovie } from "@/util/types"
import { MouseEventHandler, useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { list2str, num2USD } from "@/util/util"
import Ratings from "./movieItems/Ratings"
type Props = {
	id: string
	onClose?: MouseEventHandler<HTMLSpanElement>
}

export default function MovieDetail({ id, onClose }: Props) {
	const [tmdbMovieData, setTmdbData] = useState<any>(null)
	const [movieData, setMovieData] = useState<IMovie | null>(null)

	const getData = useCallback(async () => {
		const res = await fetch("/api/movie/" + id + "?from=list")
		const data = await res.json()
		if (!data.success) return

		const res2 = await fetch(
			"https://api.themoviedb.org/3/movie/" + data.data + "?api_key=" + "ea5bddf42dd6e62f45c9c388d34273d8"
		)
		const data2 = await res2.json()
		setTmdbData(data2)

		const res3 = await fetch("/api/movie/" + id + "?from=movies")
		const data3 = await res3.json()
		if (!data3.success) return
		setMovieData(data3.data)
	}, [])

	useEffect(() => {
		getData()
	}, [])
	return (
		<>
			{movieData && tmdbMovieData ? (
				<div className="bg-body-secondary detail-container">
					{onClose && (
						<button id="close" className="btn btn-secondary" onClick={onClose}>
							&times;
						</button>
					)}

					<div className="container">
						<h5 className="title">
							<b>{movieData.title}</b>
						</h5>
						<div className="content">
                            <div className="row  row-cols-1 row-cols-md-2">
                            <div className=" poster d-sm-none d-md-block d-none ">

                                <Image
                                    src={movieData.image}
                                    alt="poster"
                                    className="rounded  "
                                    width={200}
                                    height={300}
                                />
                                </div >
                                <div className=" poster-small d-sm-block d-md-none">
                                <Image
                                    src={movieData.image}
                                    alt="poster"
                                    className="rounded "
                                    width={100}
                                    height={150}
                                />
                            </div>
							<div >
								<p>{tmdbMovieData.overview}</p>
                                <div className="container">
								<Ratings movie={movieData} />
							</div>
							</div>
							
                            </div>
							<table className=" table table-striped table-dark">
								<tbody>
									<tr className="row row-cols-1 row-cols-md-2">
										<th scope="row">Release</th>
										<td>{movieData.releaseDate}</td>
									</tr>
									<tr className="row row-cols-1 row-cols-md-2">
										<th scope="row">Director</th>
										<td>{movieData.director}</td>
									</tr>
									<tr className="row row-cols-1 row-cols-md-2">
										<th scope="row">Revenue</th>
										<td>{num2USD(movieData.worldwideGross)}</td>
									</tr>
									<tr className="row row-cols-1 row-cols-md-2">
										<th scope="row">Budget</th>
										<td>{movieData.budget}</td>
									</tr>
									<tr className="row row-cols-1 row-cols-md-2">
										<th scope="row">Run time</th>
										<td>{movieData.runtimeMins}mins</td>
									</tr>
                                    <tr className="row row-cols-1 row-cols-md-2">
										<th scope="row">Content Rating</th>
										<td>{movieData.contentRating}</td>
									</tr>
                                    <tr className="row row-cols-1 row-cols-md-2">
										<th scope="row">Country</th>
										<td>{movieData.countries}</td>
									</tr>
									<tr className="row row-cols-1 row-cols-md-2">
										<th scope="row">Actors</th>
										<td>{list2str(movieData.actors)}</td>
									</tr>
									<tr className="row row-cols-1 row-cols-md-2">
										<th scope="row">Companies</th>
										<td>{list2str(movieData.companies)}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			) : (
				<div className="d-flex justify-content-center align-items-center">
					{" "}
					<Image src={"/loading.gif"} width={200} height={200} alt="loading"></Image>
				</div>
			)}

			<style jsx>
				{`
                .poster{
                    width:200px;
                    height:300px;

                }.poster-small{
                    width:100px;
                    height:150px;
                    
                }
                .poster,.poster-small{
                    margin:10px;
                }
					.title {
						font-size: 25px;
					}
					.content {
						display: flex;
						flex-wrap: wrap;
						align-items: stretch;
					}
					table {
						margin: 4px;
					}
					#close {
						position: absolute;
						top: 0;
						right: 0;
						cursor: pointer;
						font-size: 20px;
					}
					.container {
						padding: 10px;
					}
					.detail-container {
						width: 100%;
						height: 100%;
					}
					.poster {
						width: 200px;
						height: 300px;
					}
				`}
			</style>
		</>
	)
}
