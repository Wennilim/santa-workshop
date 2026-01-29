/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { DeleteIcon } from "../../assets/icons";
import { cn } from "../../utils/cn";

const wishlist = [
  {
    id: 1,
    name: "Macbook Pro 16",
  },
  {
    id: 2,
    name: "Macbook Air M5",
  },
  {
    id: 3,
    name: "AirPods Pro 3",
  },
];

const EmptyWishlist = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-white/40 p-5 rounded-[10px]">
      <img
        src="/images/no-wishlist.png"
        alt="empty wishlist"
        className="size-40"
      />
      <p className="text-[18px] md:text-[24px] font-bold max-w-[420px] text-center">
        Nothing here yet. <br /> Start adding your gift ideas!{" "}
      </p>
    </div>
  );
};

export const MyWishlistCard = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [newIdea, setNewIdea] = useState(wishlist || []);
  const [newInput, setNewInput] = useState("");

  const addIdeaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isAdd) {
      addIdeaRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isAdd]);

  return (
    <section
      id="my-wishlist"
      aria-label="My wishlist"
      className={cn(
        "bg-[#FFD6D6] rounded-[50px] border-8 border-[#ffffff] shadow-lg p-6 md:px-12 md:py-16 mt-10 md:mt-6 flex flex-col",
        newIdea.length > 0 ? "min-h-[600px]" : "min-h-[620px]",
      )}
    >
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-6">
          <img src="/icons/wishlist.svg" alt="wishlist" className="size-12" />
          <h5 className="font-[dynapuff] text-[18px] md:text-[32px] font-semibold text-[#E63946]">
            My Wishlist
          </h5>
        </div>
        {newIdea.length > 0 && (
          <div className="flex md:gap-2 mt-1">
            <button
              className={cn(
                "text-white font-[dynapuff] text-[18px] md:text-[29px] cursor-pointer",
                "transition-colors duration-200",
                "hover:scale-110",
                "active:scale-95",
                "transition-transform duration-200",
              )}
              onClick={() => setIsEdit(!isEdit)}
            >
              {!isEdit ? (
                <img src="/icons/edit.svg" alt="edit" />
              ) : (
                <img src="/icons/close2.svg" alt="close" />
              )}
            </button>
            {isEdit && (
              <button
                className={cn(
                  "text-white font-[dynapuff] text-[18px] md:text-[29px] cursor-pointer",
                  "transition-colors duration-200",
                  "hover:scale-110",
                  "active:scale-95",
                  "transition-transform duration-200",
                )}
                onClick={() => setIsEdit(!isEdit)}
              >
                <img src="/icons/save.svg" alt="save" />
              </button>
            )}
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex flex-col gap-4",
          newIdea.length > 0 && "max-h-[350px] overflow-y-scroll",
        )}
      >
        {newIdea.length > 0 ? (
          newIdea.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-white/40 rounded-[10px] flex items-center justify-between"
            >
              <span className="text-lg font-semibold">{item.name}</span>
              <button
                onClick={() =>
                  setNewIdea(newIdea.filter((i) => i.id !== item.id))
                }
                className={cn(
                  "cursor-pointer rounded-lg p-2.5 shadow-lg bg-[#FDF2F8]",
                  "hover:bg-[#FDF2F8]/80",
                  "active:bg-[#FDF2F8]/60",
                  "transition-colors duration-200",
                  "hover:scale-110",
                  "active:scale-95",
                  "transition-transform duration-200",
                  isEdit ? "opacity-100" : "opacity-0",
                )}
              >
                <DeleteIcon className="size-6 text-[#E63946]" />
              </button>
            </div>
          ))
        ) : (
          <EmptyWishlist />
        )}
        {isAdd && (
          <div
            ref={addIdeaRef}
            className="p-5 bg-white/40 rounded-[10px] flex items-center justify-between"
          >
            <input
              type="text"
              placeholder="Add new idea"
              className="w-full p-2 rounded-md border-white focus:outline-none"
              onChange={(e) => setNewInput(e.target.value)}
            />
            <button
              className={cn(
                "cursor-pointer rounded-lg p-2.5 shadow-lg bg-[#FDF2F8]",
                "hover:bg-[#FDF2F8]/80",
                "active:bg-[#FDF2F8]/60",
                "transition-colors duration-200",
                "hover:scale-110",
                "active:scale-95",
                "transition-transform duration-200",
                isEdit && !isAdd ? "opacity-100" : "opacity-0",
              )}
            >
              <DeleteIcon className="size-6 text-[#E63946]" />
            </button>
            <button
              onClick={() => {
                setIsAdd(false);
                setNewInput("");
                setNewIdea([
                  ...newIdea,
                  { id: newIdea.length + 1, name: newInput },
                ]);
              }}
              disabled={!newInput || newInput.trim() === ""}
              className={cn(
                "cursor-pointer",
                "transition-colors duration-200",
                "hover:scale-110",
                "active:scale-95",
                "transition-transform duration-200",
                "disabled:opacity-50",
                "disabled:cursor-not-allowed",
                isAdd ? "opacity-100" : "opacity-0",
              )}
            >
              <img src="/icons/add.svg" alt="add" />
            </button>
          </div>
        )}
      </div>
      <button
        onClick={() => {
          setIsAdd(true);
          addIdeaRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }}
        className="mt-auto md:mt-8 w-full p-5 md:p-8 rounded-md text-[18px] border-white border-dashed border-2 text-[#E63946] md:text-[20px] cursor-pointer"
      >
        + Add Idea
      </button>
    </section>
  );
};
