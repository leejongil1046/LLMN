import { useState } from "react";
import Input from "@/components/commons/input";
import InputWithDropdown from "@/components/commons/input-with-dropdown"; // 수정된 드롭다운 컴포넌트
import Layout from "@/components/commons/layout";
import Image from "next/image";
import Link from "next/link";
import ButtonSmall from "@/components/commons/button-small";

export default function NewItem() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [cloudName, setCloudName] = useState("");
  const [containerName, setContainerName] = useState("");
  const cloudOptions = [
    "Ubuntu (54.180.244.93)",
    "Amazon Linux (72.180.244.93)",
    "연결하지 않음",
  ];
  const containerOptions = ["Spring", "FastAPI", "React", "연결하지 않음"];

  const handleCloudSelect = (name: string) => {
    setCloudName(name);
  };
  const handleContainerSelect = (name: string) => {
    setContainerName(name);
  };

  return (
    <Layout>
      <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-start items-start gap-1 xs:gap-2">
            <div className="flex flex-row justify-start items-center">
              <Link href="/log/1">
                <Image
                  src="/images/back.svg"
                  alt="back"
                  width={45}
                  height={45}
                  className="w-[35px] h-[35px] xs:w-[40px] xs:h-[40px] sm:w-[45px] sm:h-[45px]"
                />
              </Link>
              <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold">
                수정하기
              </span>
            </div>
            <span className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold">
              {"<주의>"} 컨테이너의 이름이 잘못 입력되면 기능이 정상적으로
              작동하지 않을 수 있습니다.
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-12 xs:gap-14 sm:gap-16 mt-12 xs:mt-14 sm:mt-16">
          <Input
            type="text"
            label="프로젝트 이름"
            placeholder="이름을 입력해주세요."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            maxWidth="1200px"
          />
          <Input
            type="text"
            label="설명"
            placeholder="설명을 입력해주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxWidth="1200px"
          />
          <InputWithDropdown
            label="클라우드 인스턴스"
            placeholder="연결할 인스턴스를 선택해주세요."
            value={cloudName}
            options={cloudOptions}
            onSelect={handleCloudSelect}
            maxWidth="1200px"
          />
          <InputWithDropdown
            label="컨테이너"
            placeholder="연결할 컨테이너를 선택해주세요."
            value={containerName}
            options={containerOptions}
            onSelect={handleContainerSelect}
            maxWidth="1200px"
          />
          <div className="flex flex-row justify-end items-center w-full mt-12 xs:mt-16 sm:mt-20">
            <ButtonSmall label="완료" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
