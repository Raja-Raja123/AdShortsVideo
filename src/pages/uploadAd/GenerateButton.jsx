export default function GenerateButton({ onClick, disabled }) {

return (

<button
onClick={onClick}
disabled={disabled}
className={`px-6 py-2 rounded text-white transition
${disabled 
  ? "bg-gray-500 cursor-not-allowed"
  : "bg-purple-600 hover:bg-purple-700"
}`}
>
Generate Ad Video
</button>

);

}