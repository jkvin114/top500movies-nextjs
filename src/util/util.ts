export function num2USD(num:number):string{
    let str=String(num)
    let s=""
    for(let i=str.length-1;i>=0;i--){
        s=str[i]+s
        if((str.length-1- i)%3==2 && i!==0 && i!==str.length-1) s=","+s
    }
    return "$"+s

}
export function normalize(list:number[],max?:number){
	let mx=max?max:getMaxVal<number>(list,(n:number)=>n)
	return list.map((val)=>val/mx)
}

export function getMaxVal<T>(list:Iterable<T>,maxfunc:Function):number{
    let max=-Infinity
    for(let n of list){
        max=Math.max(maxfunc(n),max)
    }
    return max
}