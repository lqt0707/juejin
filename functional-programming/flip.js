 const  flip = fn=>(a,b,...args)=>fn(b,a,...args)

 const subtract =(a,b)=>a-b

 const flippedSubtract =flip(subtract)

 console.log(flippedSubtract(3,5));