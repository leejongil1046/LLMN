import React, { ReactNode, useState } from "react";
import InputInModal from "./input-in-modal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstanceModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-70"
        onClick={onClose}
      ></div>
      <div className="w-[90%] xs:w-[80%] sm:w-[75%] lg:w-[770px] bg-white px-6 xs:px-8 sm:px-10 py-4 xs:py-5 sm:py-6 rounded-xl shadow-lg z-10">
        <div className="flex flex-row justify-between items-center">
          <div className="text-[20px] xs:text-[22px] sm:text-[24px] font-bold ml-1">
            인스턴스 추가
          </div>
          <div
            className="flex flex-row justify-center items-center w-[24px] xs:w-[27px] sm:w-[30px] h-[24px] xs:h-[27px] sm:h-[30px] rounded-full bg-[#E5E5E5] text-[12px] xs:text-[14px] sm:text-[16px] mr-1"
            onClick={onClose}
          >
            ✕
          </div>
        </div>
        <div className="flex flex-col justify-start items-start rounded-lg overflow-y-auto gap-1 xs:gap-1.5 sm:gap-2 px-2 py-2 mt-3 xs:mt-4 sm:mt-5">
          <InputInModal
            type="text"
            label="원격 서버 사용자"
            placeholder="원격 서버의 사용자명을 입력해주세요."
            maxWidth="600px"
          />
          <div className="w-full max-w-[600px] px-1 -mt-1 xs:-mt-1.5 sm:-mt-2 text-[12px] xs:text-[13px] sm:text-[14px] font-semibold text-gray-400">
            닉네임을 2자에서 8자 사이로 입력해주세요.
          </div>
          <InputInModal
            type="text"
            label="호스트"
            placeholder="원격 서버의 IP 주소를 입력해주세요."
            maxWidth="600px"
          />
          <div className="w-full max-w-[600px] px-1 -mt-1 xs:-mt-1.5 sm:-mt-2 text-[12px] xs:text-[13px] sm:text-[14px] font-semibold text-gray-400">
            비밀번호가 유효하지 않습니다.
          </div>
          <InputInModal
            type="text"
            label="프라이빗 키"
            placeholder="SSH perm 키를 업로드해주세요."
            maxWidth="600px"
          />
          <div className="w-full max-w-[600px] px-1 -mt-1 xs:-mt-1.5 sm:-mt-2 text-[12px] xs:text-[13px] sm:text-[14px] font-semibold text-gray-400">
            비밀번호가 일치하지 않습니다.
          </div>
        </div>
        <div className="flex flex-row justify-center items-center w-full mt-3 xs:mt-4 sm:mt-5">
          <button
            className="w-[52px] xs:w-[58px] sm:w-[64px] h-[29px] xs:h-[32px] sm:h-[36px] text-[14px] xs:text-[15px] sm:text-[16px] text-white bg-[#0F172A] rounded-md mb-2 xs:mb-3 sm:mb-4"
            onClick={onClose}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}