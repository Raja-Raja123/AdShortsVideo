import { useState } from "react";

import StepIndicator from "./StepIndicator";
import ProductInfoStep from "./ProductInfoStep";
import MediaUploadStep from "./MediaUploadStep";
import GenerateAdStep from "./GenerateAdStep";

export default function UploadAd() {

const [step,setStep] = useState(1);

const [product,setProduct] = useState({});
const [media,setMedia] = useState({});

return(

<div className=" mx-auto p-4 space-y-6">

{/* <StepIndicator step={step}/> */}

{step===1 &&
<ProductInfoStep
setProduct={setProduct}
nextStep={()=>setStep(2)}
/>
}

{step===2 &&
<MediaUploadStep
setMedia={setMedia}
prevStep={()=>setStep(1)}
nextStep={()=>setStep(3)}
/>
}

{step===3 &&
<GenerateAdStep
product={product}
media={media}
prevStep={()=>setStep(2)}
/>
}

</div>

)
}