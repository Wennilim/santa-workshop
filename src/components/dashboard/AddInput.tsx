import { forwardRef } from "react";

export const AddInput = forwardRef<
  HTMLDivElement,
  {
    value: string;
    onChange: (v: string) => void;
    onSubmit: () => void;
  }
>(({ value, onChange, onSubmit }, ref) => {
  return (
    <div
      ref={ref}
      className="p-5 bg-white/40 rounded-[10px] flex items-center gap-2"
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add new idea"
        className="flex-1 bg-transparent outline-none"
      />

      <button
        disabled={!value.trim()}
        onClick={onSubmit}
        className="disabled:opacity-50"
      >
        <img src="/icons/add.svg" />
      </button>
    </div>
  );
});
