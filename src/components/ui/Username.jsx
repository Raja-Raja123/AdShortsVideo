const Username = ({ name, verified = false, className = "" }) => {
  return (
    <span className={`font-semibold text-sm ${className}`}>
      {name}
      {verified && (
        <span className="text-blue-500 ml-1 text-xs">✔</span>
      )}
    </span>
  );
};

export default Username;
