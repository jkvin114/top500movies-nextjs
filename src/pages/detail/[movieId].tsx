import MovieDetail from "@/components/MovieDetail";
import { useRouter } from "next/router";

export default function MovieId(){
    const router = useRouter();
  const { movieId } = router.query;

    return ((typeof movieId==="string") && (<MovieDetail id={movieId}/>))
}