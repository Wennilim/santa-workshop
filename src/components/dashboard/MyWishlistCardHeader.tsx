export const MyWishlistCardHeader = ({
  isEdit,
  hasData,
  onToggleEdit,
}: {
  isEdit: boolean;
  hasData: boolean;
  onToggleEdit: () => void;
}) => {
  return (
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-6">
        <img src="/icons/wishlist.svg" className="size-12" />
        <h5 className="font-[dynapuff] text-[24px] md:text-[32px] font-bold text-[#E63946]">
          My Wishlist
        </h5>
      </div>

      {hasData && (
        <button onClick={onToggleEdit} className="cursor-pointer">
          <img src={isEdit ? "/icons/close2.svg" : "/icons/edit.svg"} />
        </button>
      )}
    </div>
  );
};
