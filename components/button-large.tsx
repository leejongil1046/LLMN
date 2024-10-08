import Link from "next/link";

interface ButtonProps {
  label: string;
  kind: string;
  [key: string]: any;
}

export default function ButtonLarge({
  label,
  kind = "login",
  ...rest
}: ButtonProps) {
  return (
    <div
      className={`flex flex-row justify-center items-center relative w-full max-w-[605px]`}
    >
      <button className="w-full h-[45px] xs:h-[50px] sm:h-[55px] text-[16px] xs:text-[18px] sm:text-[20px] rounded-md bg-[#0F172A] text-white font-semibold">
        {label}
      </button>
      {kind === "login" ? (
        <>
          <Link href="/login/signup-step1">
            <span className="absolute left-0.5 top-[50px] xs:top-[56px] sm:top-[62px] text-[14px] xs:text-[15px] sm:text-[16px] font-semibold text-[#717478] cursor-pointer">
              회원가입
            </span>
          </Link>
          <Link href="/login/find-account-step1">
            <span className="absolute right-0.5 top-[50px] xs:top-[56px] sm:top-[62px] text-[14px] xs:text-[15px] sm:text-[16px] font-semibold text-[#717478] cursor-pointer">
              비밀번호 찾기
            </span>
          </Link>
        </>
      ) : null}
    </div>
  );
}
