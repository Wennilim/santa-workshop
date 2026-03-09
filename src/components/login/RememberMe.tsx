interface RememberMeProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const RememberMe = ({ checked, onChange }: RememberMeProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="cursor-pointer"
      />
      <p className="text-[#613E0F] font-bold text-[14px]">Remember me</p>
    </div>
  );
};
