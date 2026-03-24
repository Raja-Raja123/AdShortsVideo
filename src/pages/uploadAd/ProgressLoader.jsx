export default function ProgressLoader(){

  return (

    <div className="text-center mt-6">

      <p className="text-lg font-semibold">
        Generating your Ad...
      </p>

      <div className="mt-2 animate-pulse text-gray-500">
        Rendering video frames...
      </div>

    </div>

  );
}