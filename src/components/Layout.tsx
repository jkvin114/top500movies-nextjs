import { NextComponentType, NextPage } from "next"
import { AppProps } from "next/app"
import React, { ReactElement } from "react"

export default function Layout({children}:React.PropsWithChildren) {
    return (<>
    <p>NAVBAR</p>
        {children}
    </>)
}