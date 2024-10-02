import Image from "next/image";
import { useRef } from "react";

interface InputProps {
  type: string;
  label: string;
  placeholder: string;
  maxWidth?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  [key: string]: any;
}

export default function Input({
  type,
  label,
  placeholder,
  maxWidth = "605px",
  value = "",
  onChange,
  readOnly = false,
  ...rest
}: InputProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
      // 추가로 파일을 처리하는 로직 작성
    }
  };
  return (
    <div
      className="flex flex-col justify-center items-center relative w-full mt-5 xs:mt-8"
      style={{ maxWidth: maxWidth }}
    >
      {label?.trim() ? (
        <label
          htmlFor={label}
          className="absolute -top-6 xs:-top-7 sm:-top-8 left-1 text-[17px] xs:text-[18px] sm:text-[19px]"
        >
          {label}
        </label>
      ) : null}
      <input
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={value === "" ? placeholder : ""}
        readOnly={readOnly}
        className="appearance-none w-full h-[44px] xs:h-[52px] sm:h-[60px] text-[14px] xs:text-[15px] sm:text-[16px] text-gray-600 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:ring-offset-0 focus:ring-1"
        {...rest}
      />
      {label === "프라이빗 키" ? (
        <div className="flex flex-row justify-center items-center absolute top-2 sm:top-3 right-4 xs:right-5 sm:right-6 cursor-pointer">
          <Image
            src="/images/upload.svg"
            alt="upload"
            width={36}
            height={33}
            className="xs:w-[36px] xs:h-[33px] w-[26px] h-[25px]"
            onClick={handleImageClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : null}
    </div>
  );
}
