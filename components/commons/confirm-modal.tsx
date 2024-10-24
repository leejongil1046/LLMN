import React, { useState, useEffect } from "react";
import ButtonSmall from "./button-small";
import { useRouter } from "next/router";
import { cls } from "@/utils/class-utils";
import { restartContainer } from "@/api/project/project-api";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: string;
  success?: boolean;
  overlay?: boolean;
  message?: string;
  id?: number;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  option,
  success = true,
  overlay = true,
  message = "",
  id = 0,
}: ModalProps) {
  const router = useRouter();

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(success);

  console.log("option: ", option);
  console.log("isSuccessful: ", isSuccessful);

  const restartAction = () => {
    if (!isConfirmed) {
    }
  };

  const modalContents: {
    [key: string]: {
      title: string;
      message: string;
      buttonText: string;
      closeAction: () => void;
      confirmAction: () => void;
    };
  } = {
    loginFailure: {
      title: "로그인 실패",
      message: message,
      buttonText: "확인",
      closeAction: onClose,
      confirmAction: onClose,
    },
    resetNewPassword: {
      title: "비밀번호 변경",
      message: isSuccessful
        ? "새 비밀번호로 변경되었습니다."
        : "비밀번호 변경에 실패했습니다.",
      buttonText: "확인",
      closeAction: onClose,
      confirmAction: isSuccessful
        ? () => {
            router.push("/login");
          }
        : () => {
            window.location.reload();
          },
    },
    changeMonitoringCloud: {
      title: "클라우드 변경",
      message: isSuccessful
        ? "새 클라우드로 변경되었습니다."
        : "클라우드 변경에 실패했습니다.",
      buttonText: "확인",
      closeAction: onClose,
      confirmAction: onClose,
    },
    createNewProject: {
      title: "프로젝트 생성",
      message: isSuccessful
        ? "새 프로젝트가 생성되었습니다."
        : "프로젝트 생성에 실패했습니다.",
      buttonText: "확인",
      closeAction: onClose,
      confirmAction: isSuccessful
        ? () => {
            router.push("/log");
          }
        : () => {
            window.location.reload();
          },
    },
    addNewInstance: {
      title: "인스턴스 추가",
      message: isSuccessful
        ? "새 인스턴스가 성공적으로 추가되었습니다."
        : "인스턴스 추가에 실패했습니다.",
      buttonText: "확인",
      closeAction: onClose,
      confirmAction: onClose,
    },
    editInstance: {
      title: "인스턴스 수정",
      message: isSuccessful
        ? "인스턴스가 성공적으로 수정되었습니다."
        : "인스턴스 수정에 실패했습니다.",
      buttonText: "확인",
      closeAction: onClose,
      confirmAction: onClose,
    },
    deleteInstance: {
      title: "인스턴스 삭제",
      message: isSuccessful
        ? "인스턴스가 성공적으로 삭제되었습니다."
        : "인스턴스 삭제에 실패했습니다.",
      buttonText: "확인",
      closeAction: onClose,
      confirmAction: onClose,
    },
    editProjectInfo: {
      title: "프로젝트 수정",
      message: isSuccessful
        ? "프로젝트가 성공적으로 수정되었습니다."
        : "프로젝트 수정에 실패했습니다.",
      buttonText: "확인",
      closeAction: onClose,
      confirmAction: isSuccessful
        ? () => {
            router.push(`/project/${id}`);
          }
        : () => {
            window.location.reload();
          },
    },
  };

  const modalContent = modalContents[option] || {
    title: "알 수 없는 동작",
    message: "올바른 동작을 선택해주세요.",
    buttonText: "확인",
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div
        className={cls(
          "fixed inset-0 bg-black",
          overlay ? "opacity-70" : "opacity-20"
        )}
        onClick={modalContent.closeAction}
      ></div>
      <div className="max-w-[90%] bg-white px-6 xs:px-8 sm:px-10 py-4 xs:py-5 sm:py-6 rounded-xl shadow-lg z-10">
        <div className="flex flex-row justify-between items-center">
          <div className="text-[18px] xs:text-[20px] sm:text-[22px] font-bold">
            {modalContent.title}
          </div>
          <div
            className="flex flex-row justify-center items-center w-[24px] xs:w-[27px] sm:w-[30px] h-[24px] xs:h-[27px] sm:h-[30px] rounded-full bg-[#E5E5E5] hover:bg-gray-300 text-[12px] xs:text-[14px] sm:text-[16px] cursor-pointer"
            onClick={modalContent.closeAction}
          >
            ✕
          </div>
        </div>
        <div className="text-[14px] xs:text-[16px] sm:text-[18px] mt-2 xs:mt-3 sm:mt-4">
          {modalContent.message}
        </div>
        <div className="flex flex-row justify-center items-center w-full mt-6 xs:mt-7 sm:mt-8">
          <ButtonSmall
            label={modalContent.buttonText}
            onClick={modalContent.confirmAction}
            type="modal"
          />
        </div>
      </div>
    </div>
  );
}
