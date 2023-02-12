import { FilterType, FilterViewType, SortType } from "./enum"
import { IMovie, MovieFilter, movieId, MovieSorter } from "./types"

export function num2USD(num: number): string {
    if(num<0) return "N/A"
	let str = String(num)
	let s = ""
	for (let i = str.length - 1; i >= 0; i--) {
		s = str[i] + s
		if ((str.length - 1 - i) % 3 == 2 && i !== 0 && i !== str.length - 1) s = "," + s
	}
	return "$" + s
}
export function normalize(list: number[], max?: number) {
	let mx = max ? max : getMaxVal<number>(list, (n: number) => n)
	return list.map((val) => val / mx)
}

export function getMaxVal<T>(list: Iterable<T>, maxfunc: Function): number {
	let max = -Infinity
	for (let n of list) {
		max = Math.max(maxfunc(n), max)
	}
	return max
}

export function extractNumber(str: string) {
	let s = str.match(/([0-9]+)/g)?.join('')
	if (!s) return -1
	return Number(s)
}

export class Filter {
	static NUM_FILTERS = [FilterType.IN_YEAR, FilterType.UNTIL_YEAR, FilterType.MONTH]
	static NO_CLASSIFY = [FilterType.ACTOR, FilterType.COMPANY, FilterType.DIRECTOR, FilterType.UNTIL_YEAR,FilterType.COUNTRY]
	filterView: FilterViewType
	filters: FilterType[]
	filterVals: (number|string)[]
	sort1: SortType
	sort2: SortType
    sort1Type:number
    sort2Type:number
	constructor() {
		this.filterView = FilterViewType.HIDE
		this.filters = []
		this.sort1 = SortType.WW_GROSS
		this.sort2 = SortType.NONE
		this.filterVals = []
        this.sort1Type=-1
        this.sort2Type=-1
	}
	setFilterView(fv: FilterViewType) {
//		if (Filter.NO_CLASSIFY.includes(this.filter) && fv === FilterViewType.CLASSIFY) return
		this.filterView = fv
        return this
	}
	addFilter(ft: FilterType,val:number|string) {
	//	if (Filter.NO_CLASSIFY.includes(ft) && this.filterView === FilterViewType.CLASSIFY) return
		this.filters.push(ft)
		this.filterVals.push(val)
        return this
	}
	setSort1(s: SortType,type:number) {
		this.sort1 = s
        this.sort1Type=type
		if (this.sort2 === s) this.sort2 = SortType.NONE
        return this
	}
	setSort2(s: SortType,type:number) {

		if (this.sort1 === s) {
            this.sort2 = SortType.NONE
            this.sort1Type=type
        }
		else
        {
            this.sort2 = s
            this.sort2Type=type
        } 
        return this
	}

	setSortTypes(s1: SortType, s2: SortType) {
		this.sort1 = s1
		this.sort2 = s2
        return this
	}
	clone() {
		let n = new Filter()
		n.filters = this.filters
		n.filterView = this.filterView
		n.filterVals= this.filterVals
		n.setSortTypes(this.sort1, this.sort2)
		return n
	}
	private getSorterProp(movie: IMovie, num: number) {
		let prop: string | number = 0
		switch (num === 0 ? this.sort1 : this.sort2) {
			case SortType.BUDGET:
				prop = movie.budget
				break
			case SortType.WW_GROSS:
				prop = movie.worldwideGross
				break
			case SortType.DM_GROSS:
				prop = movie.domesticGross
				break
			case SortType.INTL_GROSS:
				prop = movie.worldwideGross - movie.domesticGross
				break
			case SortType.RELEASE:
				prop = movie.releaseDate
				break
			case SortType.RATING_IMDB:
				prop = movie.imDbRating
				break
			case SortType.RATING_META:
				prop = movie.metacriticRating
				break
			case SortType.RUNNING_TIME:
				prop = movie.runtimeMins
				break
			case SortType.DM_GROSS_RATIO:
				prop = movie.domesticGross / movie.worldwideGross
				break
		}
		if (typeof prop === "string") return extractNumber(prop)
        else return prop
	}
	getSorter(): MovieSorter {
        
		return (m1: IMovie, m2: IMovie) => {
			let p1 = this.getSorterProp(m1, 0)
			let p2 = this.getSorterProp(m2, 0)
            if (p1===-1) {
				return 1
			}
			if (p2===-1) {
				return -1
			}
            if (p1 === p2) {
                let p21 = this.getSorterProp(m1, 1)
			    let p22 = this.getSorterProp(m2, 1)
                return this.sort2Type<0?p22-p21:p21-p22
            } else {
                return this.sort1Type<0? p2-p1:p1-p2
            }
		}
	}
	private satisfyFilter(movie:IMovie,i:number){
		switch (this.filters[i]) {
			case FilterType.DIRECTOR:
				return movie.director === this.filterVals[i]
			case FilterType.COMPANY:
				return movie.companies.includes(String(this.filterVals[i]))
			case FilterType.IN_YEAR:
				return Number(movie.year) === Number(this.filterVals[i])
			case FilterType.UNTIL_YEAR:
				return Number(movie.year) <= Number(this.filterVals[i])
            case FilterType.MONTH:
                let month=Number(movie.releaseDate.slice(5,7))
                return month===this.filterVals[i]
            case FilterType.ACTOR:
                return movie.actors.includes(String(this.filterVals[i]))
            case FilterType.COUNTRY:
				// return true
                return movie.countries.split(", ").includes("USA")
            case FilterType.FRANCHISE:
                let list=getFranchises(movie.id)
                // if(list.length===0) return ["Other",false]
                return (list.includes(String(this.filterVals[i])))
            case FilterType.NONE: return true
		}
		return true
	}
	private reduceMovie(m: IMovie): [string|number, boolean] {
		let valid=true
		for(let i=0;i<this.filters.length;++i){
			valid=valid&&this.satisfyFilter(m,i)
		}
		return ["",valid]
		// switch (this.filter) {
		// 	case FilterType.DIRECTOR:
		// 		return m.director === this.filterStr ? [this.filterStr, true] : ["", false]
		// 	case FilterType.COMPANY:
		// 		return m.companies.includes(this.filterStr) ? [this.filterStr, true] : ["", false]
		// 	case FilterType.IN_YEAR:
		// 		return Number(m.year) === this.filterVal ? [this.filterVal, true] : [this.filterVal, false]
		// 	case FilterType.UNTIL_YEAR:
		// 		return Number(m.year) <= this.filterVal
		// 			? ["Until " + this.filterVal, true]
		// 			: ["After " + this.filterVal, false]
        //     case FilterType.MONTH:
        //         let month=Number(m.releaseDate.slice(5,7))
        //         return month===this.filterVal?[month,true]:[month,false]
        //     case FilterType.ACTOR:
        //         return m.actors.includes(this.filterStr) ? [this.filterStr, true] : ["", false]
        //     case FilterType.COUNTRY:
        //         return m.countries==="USA"?["USA",true]:["",false]
        //     case FilterType.FRANCHISE:
        //         let list=getFranchises(m.id)
        //         // if(list.length===0) return ["Other",false]
        //         if(list.includes(this.filterStr)) return [this.filterStr,true]
        //         return ["",false]
        //     case FilterType.NONE: return ["",true]
		// }
	}
	getFilter(): MovieFilter {
		return (m: IMovie) => {
			return this.reduceMovie(m)[1]
		}
	}
    doSort(movies:IMovie[]){
        return movies.sort(this.getSorter())
    }
    doFilter(movies:IMovie[]):movieId[]{
        let mvs= movies.map((m)=>{
            return {
                id:m.id,active:this.reduceMovie(m)[1]
            }
        })
        if(this.filterView===FilterViewType.HIDE) return mvs.filter((mv)=>mv.active)
        return mvs
    }
    run(movies:IMovie[]):movieId[]{
        return this.doFilter(this.doSort(movies))
    }
    classify(movies:IMovie[]):Map<string,string[]>{
        let classify=new Map<string,string[]>()
        for(const m of movies){
            let cat=String(this.reduceMovie(m)[0])
            if(classify.has(cat)){
                classify.get(cat)?.push(m.id)
            }
            else{
                classify.set(cat,[m.id])
            }
        }
        return classify
    }
}
const F={
    "Avengers":["tt4154796","tt4154756","tt0848228","tt2395427"],
    "MCU":["tt0371746","tt5095030","tt1228705","tt1981115","tt1211837","tt1843866","tt0948470","tt10648342","tt2015381","tt0145487","tt9114286","tt3501632","tt3896198","tt2250912","tt9419884","tt4154796","tt4154756","tt10872600","tt0848228","tt2395427",
    "tt1825683","tt1300854","tt3498820","tt6320628","tt4154664"],
    "MCU phase 1":["tt0371746","tt1228705","tt0848228"],
    "MCU phase 2":["tt1981115","tt1843866","tt2395427","tt1300854"],
    "MCU phase 3":["tt5095030","tt1211837","tt2015381","tt3501632","tt3896198","tt2250912","tt4154796","tt4154756","tt1825683","tt3498820","tt6320628"
    ,"tt4154664"],
    "MCU phase 4":["tt10648342","tt9114286","tt9419884","tt10872600"],
    "Marvel Comics":["tt0371746","tt1981115","tt5095030","tt1228705","tt1211837","tt1872181","tt1843866","tt0948470","tt10648342","tt2015381","tt0316654","tt0145487","tt9114286","tt3501632","tt1270797","tt3896198","tt2250912","tt0413300","tt9419884","tt10872600","tt4154796","tt4154756","tt0848228","tt2395427",
    "tt1825683","tt1300854","tt3498820","tt4154664"],
    "Marvel Comics(Fox)":["tt5463162","tt1431045","tt1877832"],
    "Star Wars":["tt0121765","tt0076759","tt0121766","tt0120915","tt2488496","tt2527336","tt2527338","tt3748528"],
    "Star Wars (Disney)":["tt2488496","tt2527336","tt2527338","tt3748528"],
    "Star Wars (Original)":["tt0076759"],
    "Star Wars (Prequel)":["tt0121765","tt0120915","tt0121766"],
    "Avatar":["tt0499549","tt1630029"],
    "Spider-man":["tt1872181","tt0316654","tt0145487","tt2250912","tt0413300","tt10872600","tt6320628"],
    "Jurassic":["tt0369610","tt4881806","tt0107290","tt8041270"],
    "Disney Live-Action":["tt1587310","tt3040964","tt1014759","tt6105098","tt2771200","tt6139732"],
    "Disney Animated":["tt0398286","tt0317705","tt2245084","tt3521164","tt1049413","tt2380307","tt2096673","tt0266543","tt0110357","tt2948356","tt2277860","tt4520988","tt2294629","tt3606756","tt1979376","tt0435761"],
    "Harry Potter":["tt0304141","tt0330373","tt0295297","tt0417741","tt1201607","tt0241527","tt0926084","tt0373889"],
    "Wizarding World":["tt4123430","tt0304141","tt3183660","tt0330373","tt0295297","tt0417741","tt1201607","tt0241527","tt0926084","tt0373889"],
    "Fast & Furious":["tt5433138","tt6806448","tt1905041","tt2820852","tt4630562"],
    "DC Comics":["tt0974015","tt0770828","tt1386697","tt1877830","tt0451279","tt2975590","tt1477834","tt1345836","tt7286456","tt0468569"],
    "DCEU":["tt0974015","tt0770828","tt1386697","tt0451279","tt2975590","tt1477834"],
    "Lord of the Rings":["tt0167260","tt0167261","tt0120737"],
    "Hobbit":["tt0903624","tt2310332","tt1170358"],
    "Middle Earth":["tt0120737","tt0167260","tt0903624","tt2310332","tt1170358","tt0167261"],
    "Transformers":["tt3371366","tt0418279","tt1399103","tt2109248","tt1055369"],
    "Pirates of the Carribean":["tt0325980","tt1790809","tt0383574","tt1298650","tt0449088"],
    "007":["tt1074638","tt2379713","tt2382320"],
    "Toy Story":["tt1979376","tt0435761"],
    "Hunger Games":["tt1951266","tt1392170","tt1951265","tt1951264"],
}
export function getFranchises(movieid:string){
    let list=[]
    for (const [k, v] of Object.entries(F)){
        if(v.includes(movieid)) list.push(k)
    }
    return list
}
export const FRANCHISE_NAMES=Object.keys(F).sort((a,b)=>a.localeCompare(b))