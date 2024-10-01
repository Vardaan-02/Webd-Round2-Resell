export function SingleSlider({
  max,
  min,
  value,
  setValue,
}: {
  max: number;
  min: number;
  value: number;
  setValue: (value: unknown) => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="relative">
        <div
          style={{
            left: `${percentage}%`,
            transform: `translateX(${percentage * -0.15}px)`,
          }}
          className="absolute bottom-4 font-bold text-sm"
        >
          {value}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#5A189A] mt-8"
          style={{
            background: `linear-gradient(to right, #782CBF 0%, #5A189A ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
          }}
        />
      </div>
      <div className="w-full flex justify-between relative bottom-8 text-sm font-bold px-1">
        <p>{min}</p>
        <p>{max}</p>
      </div>
    </div>
  );
}
