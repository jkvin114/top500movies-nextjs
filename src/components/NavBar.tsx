import { NextComponentType, NextPage } from "next"
import { AppProps } from "next/app"
import React, { ReactElement, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function NavBar() {
   
    return (<>
        <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
            <a className="navbar-brand" href="#">Top500Movies</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link href="#" className="nav-link active" aria-current="page" >
                        Home
                        </Link>
                    </li>
                    <li className="nav-item">
                    <Link href="#" className="nav-link" >
                        2
                    </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={"https://github.com/jkvin114/top200movies-nextjs"}>
                        <Image src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Github" width={30} height={24}/>
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                    <a className="nav-link disabled">Disabled</a>
                    </li> */}
                </ul>
            </div>
        </div>
    </nav>
        <style jsx>
            {`
                nav{
                    position:fixed;
                    top:0;
                    width:100%;
                    z-index:10;
                }
            `}

        </style>
            
    </>)
}