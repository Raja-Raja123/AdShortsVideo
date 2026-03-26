export default function DurationSelector({duration,setDuration}){

  return (

    <div className="space-y-2 mt-12 mb-12 w-[90%] md:w-full">

       <h2 className="text-lg sm:text-xl font-semibold">
        Select Duration
      </h2>

      <select
        value={duration}
        onChange={(e)=>setDuration(e.target.value)}
        className="w-full
    bg-background
    text-foreground
    border
    border-blue-400
    rounded-md
    px-3
    py-2
    focus:outline-none
    focus:ring-2
    focus:ring-ring"
      >

        <option value="" className="bg-background text-foreground">Select</option>
        <option value="6" className="bg-background text-foreground">6 Seconds</option>
        <option value="10" className="bg-background text-foreground">10 Seconds</option>
        <option value="14" className="bg-background text-foreground">14 Seconds</option>
        <option value="18" className="bg-background text-foreground">18 Seconds</option>

      </select>

    </div>
  );
}