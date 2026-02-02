export const RouletteSpinButton = ({
  handleSpin,
  isSpinning,
}: {
  handleSpin: () => void;
  isSpinning: boolean;
}) => {
  return (
    <button
      onClick={handleSpin}
      disabled={isSpinning}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 
                     w-36 h-36 rounded-full bg-[#8B4D28]
                     shadow-[inset_0_4px_8px_rgba(0,0,0,0.3),0_5px_15px_rgba(0,0,0,0.3)]
                     flex flex-col items-center justify-center text-white cursor-pointer 
                     hover:bg-[#9C5A32] active:scale-95 transition-all disabled:cursor-not-allowed group"
    >
      <img
        src="/images/spin-button.png"
        alt="Spin button"
        className="w-[250px] h-[250px]"
      />
    </button>
  );
};
