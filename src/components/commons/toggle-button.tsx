// 프로젝트 내부 훅과 유틸리티 함수
import { cls } from "@/src/utils/class-utils";

interface ToggleButtonProps {
  isToggled: boolean;
  onToggle: () => void;
}

export default function ToggleButton({
  isToggled,
  onToggle,
}: ToggleButtonProps) {
  return (
    <div
      className={cls(
        "w-[42px] xs:w-[47px] sm:w-[52px] h-[22px] xs:h-[25px] sm:h-[28px] flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300",
        isToggled ? "bg-[#0F172A]" : "bg-gray-300"
      )}
      onClick={onToggle}
    >
      <div
        className={cls(
          "bg-white w-[16px] xs:w-[18px] sm:w-[20px] h-[16px] xs:h-[18px] sm:h-[20px] rounded-full shadow-md transform transition-transform duration-300",
          isToggled
            ? "translate-x-[18px] xs:translate-x-[20px] sm:translate-x-[24px]"
            : "translate-x-0"
        )}
      ></div>
    </div>
  );
}
