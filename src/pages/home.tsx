import { AppProps } from "next/app"
import { useRouter } from "next/router"

export default function Home(){
    const router=useRouter()
    return (<div>
        <br></br>{router.pathname}
    </div>)
}