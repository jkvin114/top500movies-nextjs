import Head from "next/head"
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { IMovie, IRank } from "@/util/types";
import Movies from "@/components/Movies";

export default function Home() {
  const [list, setList] = useState<IMovie[]>([]);
  const [ranks, setRanks] = useState<string[]>([]);
  const [updated, setUpdated] = useState<boolean>(true);
  const getData =useCallback(
	() => {
		if(list.length>0) return
		fetch("/api/movie").then(async (res) => {
		  const data = await res.json()
	
		  setList(data.data);
		});
		fetch("/api/movierank?limit=200").then(async (res) => {
			const data = await res.json()
	  
			setRanks(data.data.sort((a:IRank,b:IRank)=>a.rank-b.rank)
			.map((rk:IRank)=>rk.id));
		  });
	  },[updated]
  )
  useEffect(()=>{
	getData();
  },[])
  


	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Link href={"/home"}>
			home
			</Link>
			<div>
				<Movies allTimeRanks={ranks}  movies={list}/>
			</div>
			<style jsx>{`
				a {
					color:red;
					background-color:black;
				}
				.movie{
					display:block;
				}
			`}</style>
		</>
	)
}
export async function getServerSideProps(){
	return {
		props:{
			result:"result"
		}
	}
}