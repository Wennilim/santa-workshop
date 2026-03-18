import { DeleteIcon } from "../../assets/icons";

export const WishlistItem = ({
  item,
  isEdit,
  onUpdate,
  onDelete,
}: {
  item: { id: number; name: string };
  isEdit: boolean;
  onUpdate: (name: string) => void;
  onDelete: () => void;
}) => {
  return (
    <div className="p-5 bg-white/40 rounded-[10px] flex items-center justify-between">
      {isEdit ? (
        <input
          key={item.id}
          defaultValue={item.name}
          className="bg-transparent w-full mr-4 focus:outline-none"
          onBlur={(e) => {
            const value = e.target.value.trim();
            if (value && value !== item.name) onUpdate(value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
          }}
        />
      ) : (
        <span className="truncate font-semibold">{item.name}</span>
      )}

      {isEdit && (
        <button onClick={onDelete} className="cursor-pointer">
          <DeleteIcon className="size-6 text-[#E63946]" />
        </button>
      )}
    </div>
  );
};
