import Head from "next/head"
import { useState, useEffect, useCallback, MouseEventHandler } from "react"
import Link from "next/link"
import { IMovie, IRank } from "@/util/types"
import Movies from "@/components/Movies"
import { useRouter } from "next/router"
import ReactModal from "react-modal"
import MovieDetail from "@/components/MovieDetail"
export default function Home() {
	const [list, setList] = useState<IMovie[]>([])
	const [isModalOpen, setModalOpen] = useState<boolean>(false)
	const [date,setDate] = useState<string>("")
	const getData = useCallback(async() => {
		if (list.length > 0) return
		fetch("/api/movie").then(async (res) => {
			const data = await res.json()

			setList(data.data)
		})
		const info = await(await fetch("/api/info")).json()
		setDate(info.data.updateDate)
		///api/movierank?limit=200
		//https://imdb-api.com/en/API/BoxOfficeAllTime/k_104ms4wr
		// fetch("/api/movierank?limit=200").then(async (res) => {
		// 	const data = await res.json()

		// 	setRanks(data.data
		// 	.map((rk:IRank)=>rk.id));
		//   });
	}, [])
	useEffect(() => {
		getData()
	}, [])

	function onModalOpen() {
		document.body.style.overflow = "hidden"
	}
	function onModalClose() {
		document.body.style.overflow = "auto"
		//preserve query exxept for movieid
		delete router.query.movieId
		const params = new URLSearchParams({ ...(router.query as any) })
		router.push("/?" + params.toString(), undefined, { scroll: false })
	}
	const modalStyles = {
		content: {
			top: "5%",
			left: "5%",
			right: "5%",
			bottom: "5%",
			zIndex:99,
			background:"#343A40"
		},overlay: {
			background: "#000000"
		  }
	   
	}

	const router = useRouter()
	const { movieId } = router.query
	useEffect(() => {
		if(!router.query.movieId) document.body.style.overflow = "auto"
	}, [ movieId])

	function onCloseModal(){
		onModalClose()
	}
	return (
		<>
			<div className="text-body bg-body">
				<Movies movies={list} />
			</div>
			{typeof movieId === "string" && (
				<ReactModal
					isOpen={!!router.query.movieId}
					onAfterOpen={onModalOpen}
					onRequestClose={onModalClose}
					contentLabel="Example Modal"
					style={modalStyles}
					ariaHideApp={false}
				>
					<MovieDetail id={movieId} onClose={onCloseModal}></MovieDetail>
				</ReactModal>
			)}
			<p>Last update: {date}</p>
			<style jsx>
				{`
					.modal {
						z-index: 100;
					}
				`}
			</style>
		</>
	)
}
export async function getServerSideProps() {
	return {
		props: {
			result: "result",
		},
	}
}
