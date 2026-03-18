import { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import { useWishlist } from "../../hooks/useWishlist";
import { MyWishlistCardHeader } from "./MyWishlistCardHeader";
import { WishlistItem } from "./WishlistItem";
import { AddInput } from "./AddInput";

const EmptyWishlist = () => (
  <div className="flex flex-col items-center justify-center gap-4 bg-white/40 p-5 rounded-[10px]">
    <img
      src="/images/no-wishlist.png"
      alt="empty wishlist"
      className="size-40"
    />
    <p className="text-[18px] md:text-[24px] font-bold max-w-[420px] text-center">
      Nothing here yet. <br /> Start adding your gift ideas!
    </p>
  </div>
);

export const MyWishlistCard = () => {
  const { wishlist, add, update, remove } = useWishlist();

  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [newInput, setNewInput] = useState("");

  const addRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isAdd) {
      addRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isAdd]);

  const handleAdd = () => {
    const value = newInput.trim();
    if (!value) return;

    add.mutate(value);
    setNewInput("");
    setIsAdd(false);
  };

  return (
    <section
      className={cn(
        "bg-[#FFD6D6] rounded-[50px] border-8 border-white shadow-lg p-6 xl:px-12 md:py-16 mt-10 md:mt-6 flex flex-col h-full lg:w-[40%]",
        wishlist.length ? "min-h-[600px]" : "min-h-[620px]",
      )}
    >
      {/* HEADER */}
      <MyWishlistCardHeader
        isEdit={isEdit}
        hasData={wishlist.length > 0}
        onToggleEdit={() => setIsEdit((v) => !v)}
      />

      {/* LIST */}
      <div
        className={cn(
          "flex flex-col gap-4",
          wishlist.length && "max-h-[350px] overflow-y-auto",
        )}
      >
        {wishlist.length ? (
          wishlist.map((item: { id: number; name: string }) => (
            <WishlistItem
              key={item.id}
              item={item}
              isEdit={isEdit}
              onUpdate={(name) => update.mutate({ id: item.id, name })}
              onDelete={() => remove.mutate(item.id)}
            />
          ))
        ) : (
          <EmptyWishlist />
        )}

        {isAdd && (
          <AddInput
            ref={addRef}
            value={newInput}
            onChange={setNewInput}
            onSubmit={handleAdd}
          />
        )}
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={() => setIsAdd(true)}
        className="mt-auto md:mt-8 w-full p-5 md:p-8 cursor-pointer rounded-md text-[18px] border-white border-dashed border-2 text-[#E63946]"
      >
        + Add Idea
      </button>
    </section>
  );
};
