import { Html, Head, Main, NextScript } from "next/document"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

export default function Document() {

	const [date,setDate] = useState<string>("")
	const getData = useCallback(async () => {
		const info = await(await fetch("/api/info")).json()
		console.log(info)
		setDate(info.data.updateDate)
	},[])
	useEffect(()=>{
		console.log("doc")
		getData()
	},[])

	return (
		<Html lang="en" data-bs-theme="dark">
			<Head>
				<title>Top500Movies</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/rt-audience-upright.png" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
			<footer className=" bg-body-secondary disclaimer">
        <div className="container">
				{/* <p>jkvin114@gmail.com</p> */}
				<p>
					Movie data from <Link href={"https://www.themoviedb.org/"}>TheMovieDB</Link> and
					<Link href={"https://imdb-api.com/"}> IMDb API</Link>
				</p>
        <p>Rottentomatoes ratings are beta feature and could be inaccurate or missing.</p></div>
			</footer>
		</Html>
	)
}
