const themes = [
  {id:"modern",name:"Modern",preview:"https://res.cloudinary.com/dt8ohhtbl/image/upload/v1773134903/Gemini_Generated_Image_sxezxusxezxusxez_gjlyaz.png"},
  {id:"dynamic",name:"Dynamic",preview:"https://res.cloudinary.com/dt8ohhtbl/image/upload/v1773134904/Gemini_Generated_Image_hawt1mhawt1mhawt_1_nt2qpg.png"},
  {id:"retro",name:"Retro",preview:"https://res.cloudinary.com/dt8ohhtbl/image/upload/v1773134904/Gemini_Generated_Image_hawt1mhawt1mhawt_2_g5triv.png"},
  {id:"cinematic",name:"Cinematic",preview:"https://res.cloudinary.com/dt8ohhtbl/image/upload/v1773134913/Gemini_Generated_Image_hawt1mhawt1mhawt_lgsg6e.png"}
];

export default function ThemeSelector({ selected, setTheme }) {
  return (
    <div className="w-full p-4">

      <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">
        Choose Theme
      </h2>

      {/* Responsive Grid */}
      <div className="
        grid 
        grid-cols-2 
        sm:grid-cols-2  
        md:grid-cols-4 
        gap-3 sm:gap-4
      ">

        {themes.map((theme) => (
          <div
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={`
              cursor-pointer rounded-lg border overflow-hidden
              transition-all duration-200 w-[90%] md:w-full
              ${selected === theme.id
                ? "border-purple-600 ring-2 ring-purple-500"
                : "border-gray-300 hover:border-purple-400"
              }
            `}
          >

            {/* Image with fixed ratio */}
            <div className="w-full bg-gray-400">
              <img
                src={theme.preview}
                alt={theme.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Theme name */}
            <div className="text-center py-1 text-xs sm:text-sm font-medium">
              {theme.name}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}