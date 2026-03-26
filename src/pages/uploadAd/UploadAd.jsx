import { useState } from "react";


import ProductInfoStep from "./ProductInfoStep";
import MediaUploadStep from "./MediaUploadStep";
import GenerateAdStep from "./GenerateAdStep";

export default function UploadAd() {

const [step,setStep] = useState(1);

const [product,setProduct] = useState({});
const [media,setMedia] = useState({});

return(

<div className="w-full min-[875px]:w-2xl p-2 mb-25">


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