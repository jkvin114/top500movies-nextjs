import { IMovie } from "@/util/types"
import Image from "next/image"

export default function Ratings({ movie }: { movie: IMovie | undefined }) {
	function getValue(str: string | number | undefined): number {
		if (str === "" || !str) return -1
		return Number(str)
	}
	const meta = getValue(movie?.metacriticRating)
	const imdb = getValue(movie?.imDbRating)
	const tomato = getValue(movie?.rtScore)
	const tomato_aud = getValue(movie?.rtAudienceScore)

	return (
		<>
			<div className="row">
				<div className="rating col-2">
					{/* <Image title="metacritic score" className="icon" src="/metacritic.svg" alt="metacritic" width={30} height={30} /> */}
					<span
						title="metacritic score"
						className={`metascore ${meta < 0 && "gray"} 
         ${meta >= 0 && meta <= 40 && "red"} 
         ${meta > 40 && meta <= 60 && "yellow"} 
         `}
					>
						{meta === -1 ? "-" : meta}{" "}
					</span>
				</div>
				<div className="rating col">
					<Image title="ImDB rating" className="icon" src="/star.png" alt="metacritic" width={25} height={25} />
					<b title="ImDB rating" className="imdbscore">
						{imdb === -1 ? "N/A" : imdb}{" "}
					</b>
				</div>
				<div className="rating col">
					{(movie?.rtState === "" || !movie?.rtState) && (
						<>
							{" "}
							<Image
								title="Tomatometer"
								className="icon grayscale"
								src="/rt-fresh.png"
								alt="Tomatometer"
								width={35}
								height={35}
							/>
							<b title="Tomatometer" className="rottentomato">
								{" "}
								-{" "}
							</b>
						</>
					)}
					{(movie?.rtState === "rotten"||movie?.rtState === "r") && (
						<>
							{" "}
							<Image
								title="Tomatometer"
								className="icon"
								src="/rt-rotten.png"
								alt="Tomatometer"
								width={35}
								height={35}
							/>
							<b title="Tomatometer" className="rottentomato">
								{tomato}%
							</b>
						</>
					)}
					{(movie?.rtState === "fresh"||movie?.rtState === "f") && (
						<>
							{" "}
							<Image
								title="Tomatometer"
								className="icon"
								src="/rt-fresh.png"
								alt="Tomatometer"
								width={35}
								height={35}
							/>
							<b title="Tomatometer" className="rottentomato">
								{tomato}%
							</b>
						</>
					)}
					{(movie?.rtState === "certified-fresh"||movie?.rtState === "c") && (
						<>
							{" "}
							<Image
								title="Tomatometer"
								className="icon"
								src="/rt-certified-fresh.png"
								alt="Tomatometer"
								width={35}
								height={35}
							/>
							<b title="Tomatometer" className="rottentomato">
								{tomato}%
							</b>
						</>
					)}
				</div>
				<div className="rating col-4">
					{(movie?.rtAudienceState === "" || !movie?.rtAudienceState) && (
						<>
							{" "}
							<Image
								title="RT audience"
								className="icon grayscale"
								src="/rt-audience-upright.png"
								alt="Tomatometer"
								width={25}
								height={35}
							/>
							<b title="RT audience" className="rottentomato">
								{" "}
								-{" "}
							</b>
						</>
					)}
					{(movie?.rtAudienceState === "spilled"||movie?.rtAudienceState === "s") && (
						<>
							{" "}
							<Image
								title="RT audience"
								className="icon"
								src="/rt-audience-spilled.png"
								alt="Tomatometer"
								width={35}
								height={25}
							/>
							<b title="RT audience" className="rottentomato">
								{tomato_aud}%
							</b>
						</>
					)}
					{(movie?.rtAudienceState === "upright"||movie?.rtAudienceState === "u") && (
						<>
							{" "}
							<Image
								title="RT audience"
								className="icon"
								src="/rt-audience-upright.png"
								alt="Tomatometer"
								width={25}
								height={35}
							/>
							<b title="RT audience" className="rottentomato">
								{tomato_aud}%
							</b>
						</>
					)}
				</div>
			</div>
			<style jsx>
				{`
					.rottentomato {
						margin-left: 4px;
						font-size: 18px;
						color: whitesmoke;
					}
					.imdbscore {
						margin-left: 4px;
						vertical-align: middle;
						color: whitesmoke;
						font-size: 17px;
					}
					.header {
						min-height: 80px;
						text-align: center;
					}
					.metascore {
						margin-left: 4px;
						display: inline-block;
						color: white;
						background: #66cc33;
						font-weight: bold;
						width: 35px;
						height: 35px;
						border-radius: 4px;
						line-height: 35px;
						text-align: center;
					}
					.metascore.gray {
						background: #aaaaaa;
					}
					.metascore.red {
						background: red;
					}
					.metascore.yellow {
						background: #ffcc33;
					}
					.icon {
						display: inline;
					}
					.rating {
						padding: 6px;
						display: flex;
						align-items: center;
						justify-content: center;
						min-height: 50px;
						text-align: center;
					}
				`}
			</style>
		</>
	)
}
