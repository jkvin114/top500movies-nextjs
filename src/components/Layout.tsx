import { NextComponentType, NextPage } from "next"
import { AppProps } from "next/app"
import React, { ReactElement, useEffect } from "react"
import NavBar from "./NavBar"

export default function Layout({children}:React.PropsWithChildren) {
   
    return (<>
        <NavBar/>
        {children}
    </>)
}