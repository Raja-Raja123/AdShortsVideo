import MediaUploader from "./MediaUploader";

export default function MediaUploadStep({setMedia,nextStep,prevStep}){

return(

<div className="space-y-6 space-x-4">

<h2 className="text-xl font-semibold">Upload Media</h2>

<MediaUploader setMedia={setMedia}/>

<div className="flex justify-between mt-13">

<button
onClick={prevStep}
className="border px-6 py-2 rounded"
>
Back
</button>

<button
onClick={nextStep}
className="bg-purple-600 text-white px-6 py-2 rounded"
>
Continue
</button>

</div>

</div>

)

}