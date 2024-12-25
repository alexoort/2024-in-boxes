export default function BoxGrid() {
  // Generate an array of 20 boxes (can be adjusted)
  const boxes = Array.from({ length: 4000 }, (_, index) => index);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {boxes.map((box) => (
          <div
            key={box}
            className="w-full max-w-[120px] aspect-[2/3] bg-black"
          />
        ))}
      </div>
    </div>
  );
}
