export const RoulettePointer = () => {
  return (
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
      <img src="/images/star.png" alt="Star" className="w-14 h-14 z-20" />

      {/* 细长杆 */}
      <div className="-mt-2 w-[3px] h-8 bg-slate-700 rounded-full shadow-lg" />

      {/* 针尖（菱形） */}
      <div
        className="-mt-1 w-0 h-0
               border-l-4 border-l-transparent
               border-r-4 border-r-transparent
               border-t-14 border-t-slate-800
               drop-shadow-sm"
      />
    </div>
  );
};
