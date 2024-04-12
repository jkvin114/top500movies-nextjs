import { NextComponentType, NextPage } from "next"
import { AppProps } from "next/app"
import React, { ReactElement, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

export default function NavBar() {
    const router=useRouter()
    return (<>
        <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary justify-content-between">
            <div className="container-fluid">

            <Link className="navbar-brand"
            href={{
            pathname: `/`,
            query: { ...router.query,movieId:""},
                }} shallow={true} scroll={false}>
           TOP500Movies</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {/*  <Image src="/rt-audience-upright.png" alt="" width={24} height={30}/><li className="nav-item">
                        <Link href="#" className="nav-link active" aria-current="page" >
                        Home
                        </Link> 
                    </li>
                    <li className="nav-item">
                    <Link href="/tech" className="nav-link" >
                        Dev
                    </Link>
                    </li> */}
                    {/* <li className="nav-item btn-nav">
                        <Link href={"https://github.com/jkvin114/top200movies-nextjs"}>
                        <Image src="/github.png" alt="Github" width={35} height={35}/>Github
                        </Link>
                    </li> */}
                </ul>
            </div>
        </div>
    </nav>
    </>)
}