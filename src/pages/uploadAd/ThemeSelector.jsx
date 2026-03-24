const themes = [
  {id:"modern",name:"Modern",preview:"https://res.cloudinary.com/dt8ohhtbl/image/upload/v1773134903/Gemini_Generated_Image_sxezxusxezxusxez_gjlyaz.png"},
  {id:"dynamic",name:"Dynamic",preview:"https://res.cloudinary.com/dt8ohhtbl/image/upload/v1773134904/Gemini_Generated_Image_hawt1mhawt1mhawt_1_nt2qpg.png"},
  {id:"retro",name:"Retro",preview:"https://res.cloudinary.com/dt8ohhtbl/image/upload/v1773134904/Gemini_Generated_Image_hawt1mhawt1mhawt_2_g5triv.png"},
  {id:"cinematic",name:"Cinematic",preview:"https://res.cloudinary.com/dt8ohhtbl/image/upload/v1773134913/Gemini_Generated_Image_hawt1mhawt1mhawt_lgsg6e.png"}
];

export default function ThemeSelector({selected,setTheme}){

  return (

    <div>

      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Choose Theme
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

        {themes.map(theme=>(
         
          <div
            key={theme.id}
            onClick={()=>setTheme(theme.id)}
            className={`cursor-pointer rounded-lg border
                ${selected===theme.id
                    ?"border-purple-600"
                    :"border-gray-300"
                }`}
                >

            <img
              src={theme.preview}
              className="rounded-lg h- w-full object-cover"
              />
          </div>
              
            

        ))}

        

      </div>

    </div>
  );
}