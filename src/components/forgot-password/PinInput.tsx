import { useRef } from "react";

interface PinInputProps {
  onChange: (value: string) => void;
}

export const PinInput = ({ onChange }: PinInputProps) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const getFullValue = () => {
    return inputsRef.current.map((input) => input?.value || "").join("");
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    const input = e.currentTarget;
    // 只允许数字
    input.value = input.value.replace(/[^0-9]/g, "");

    // 自动跳到下一个
    if (input.value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    onChange(getFullValue());
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const input = e.currentTarget;
    // 按 backspace，如果当前为空就跳回上一个
    if (e.key === "Backspace" && !input.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
      // 在异步操作中触发 onChange 以确保获取到最新的 DOM 状态
      setTimeout(() => {
        onChange(getFullValue());
      }, 0);
    }
  };

  return (
    <div className="flex gap-1 justify-between items-center w-full">
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          inputMode="numeric"
          pattern="[0-9]"
          className="w-12 h-12 text-center rounded-lg text-lg bg-[#D9D9D9] focus:outline-none"
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          onInput={(e) => handleInput(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};
