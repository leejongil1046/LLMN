// 외부 라이브러리
import { useEffect, useState } from "react";

// 서버 사이드 데이터, 타입 및 API
import { checkNicknameDuplication } from "@/src/api/login/signup-api";

// 프로젝트 내부 훅과 유틸리티 함수
import { validateNickname } from "@/src/utils/validation-utils";

interface UseNicknameCheckReturn {
  nickname: string;
  isValidNickname: boolean | null;
  nicknameMsg: string;
  isNicknameEdited: boolean;
  handleNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  verifyNickname: () => Promise<void>;
}

export default function useNicknameCheck(
  initialNickname: string
): UseNicknameCheckReturn {
  const [nickname, setNickname] = useState<string>(initialNickname);
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [nicknameMsg, setNicknameMsg] = useState<string>("");
  const [isNicknameEdited, setIsNicknameEdited] = useState(false);

  const handleNicknameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputNickname = event.target.value;
    setNickname(inputNickname);

    if (inputNickname.trim() === "") {
      setIsValidNickname(false);
      setNicknameMsg("");
    }
  };

  const verifyNickname = async (): Promise<void> => {
    if (!validateNickname(nickname)) {
      setIsValidNickname(false);
      setNicknameMsg("2자 이상 8자 이하의 한글, 영어, 숫자를 입력하세요.");
      if (!isNicknameEdited) setIsNicknameEdited(true);
      return;
    }

    try {
      const result = await checkNicknameDuplication(nickname);
      console.log("result: ", result);
      if (!result.isDuplicate) {
        setIsValidNickname(true);
        setNicknameMsg("사용 가능한 닉네임입니다.");
      } else {
        setIsValidNickname(false);
        setNicknameMsg("이미 사용 중인 닉네임입니다.");
      }
      if (!isNicknameEdited) setIsNicknameEdited(true);
    } catch (error) {
      console.error("닉네임 체크 중 오류 발생:", error);
      setIsValidNickname(false);
      setNicknameMsg("닉네임 검사 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (initialNickname !== "" && initialNickname === nickname) {
      setIsValidNickname(true);
      setNicknameMsg("현재 사용 중인 닉네임입니다.");
      return;
    }

    const timer = setTimeout(async () => {
      if (nickname) {
        await verifyNickname();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [nickname]);

  return {
    nickname,
    isValidNickname,
    nicknameMsg,
    isNicknameEdited,
    handleNicknameChange,
    verifyNickname,
  };
}
