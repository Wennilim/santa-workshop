import React, { useState } from "react";
import { cn } from "../utils/cn";

type RatingProps = {
  max?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  size?: number;
  disabled?: boolean;
};

export const Rating: React.FC<RatingProps> = ({
  max = 5,
  value,
  defaultValue = 0,
  onChange,
  size = 32,
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleClick = (val: number) => {
    if (disabled) return;

    if (!isControlled) {
      setInternalValue(val);
    }
    onChange?.(val);
  };

  const handleMouseEnter = (val: number) => {
    if (disabled) return;
    setHoverValue(val);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setHoverValue(null);
  };

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const active =
          hoverValue !== null
            ? starValue <= hoverValue
            : starValue <= currentValue;

        return (
          <button
            key={starValue}
            type="button"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            disabled={disabled}
            className="transition-transform active:scale-90 cursor-pointer"
          >
            <Star filled={active} size={size} />
          </button>
        );
      })}
    </div>
  );
};

type StarProps = {
  filled: boolean;
  size: number;
};

const Star: React.FC<StarProps> = ({ filled, size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "#facc15" : "#e5e7eb"} // yellow-400 / gray-200
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transition-colors")}
    >
      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24L14.81 8.63L12 2 9.19 8.63 2 9.24L7.46 13.97 5.82 21L12 17.27Z" />
    </svg>
  );
};
