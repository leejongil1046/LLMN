import { cls } from "@/utils/class-utils";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: string;
}

export default function ButtonSmall({
  label,
  disabled = false,
  onClick,
  type = "",
}: ButtonProps) {
  return (
    <div className="flex flex-row justify-center items-center relative flex-shrink-0">
      <button
        className={cls(
          "h-[40px] xs:h-[45px] sm:h-[50px] text-[16px] xs:text-[18px] sm:text-[20px] rounded-md font-semibold px-[20px] xs:px-[22px] sm:px-[24px] text-white transition-colors",
          disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gray-800 cursor-pointer hover:bg-black",
          type === "modal"
            ? "h-[35px] xs:h-[40px] sm:h-[45px] text-[14px] xs:text-[16px] sm:text-[18px]"
            : ""
        )}
        // style={{ backgroundColor: color }}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}
