export default function StepIndicator({step}){

const steps=["Product Info","Upload Media","Generate Ad"]

return(

<div className="flex justify-between text-sm sm:text-base">

{steps.map((s,i)=>{

const index=i+1

return(

<div
key={i}
className={`flex-1 text-center
${index<=step
?"text-purple-600 font-semibold"
:"text-gray-400"
}`}
>

{index}. {s}

</div>

)

})}

</div>

)

}