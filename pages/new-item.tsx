import { useState } from "react";
import Input from "@/components/input";
import Layout from "@/components/layout";

export default function NewItem() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [containerName, setContainerName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleContainerSelect = (name: string) => {
    setContainerName(name);
    toggleModal();
  };

  return (
    <Layout>
      <div className="px-5 xs:px-7 sm:px-10">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-start items-start gap-1 xs:gap-2">
            <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
              새로운 아이템
            </span>
            <span className="text-[12px] xs:text-[15px] sm:text-[18px] text-[#979797] font-semibold">
              {"<주의>"} 컨테이너의 이름을 추후에 변경하면 기능이 정상적으로
              작동하지 않을 수 있습니다.
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-5 xs:gap-7 sm:gap-8 mt-3 xs:mt-4 sm:mt-5">
          <Input
            type="text"
            label="프로젝트 이름"
            placeholder="이름을 입력해주세요."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            maxWidth="1000px"
          />
          <Input
            type="text"
            label="설명"
            placeholder="설명을 입력해주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxWidth="1000px"
          />
          <div onClick={toggleModal} className="relative w-full cursor-pointer">
            <Input
              type="text"
              label="컨테이너 이름"
              placeholder="연결할 컨테이너를 선택해주세요."
              value={containerName}
              readOnly={true}
              maxWidth="1000px"
            />
            {isModalOpen && (
              <div className="absolute top-[75px] xs:top-[95px] sm:top-[105px] w-full max-w-[1000px] max-h-[140px] sm:max-h-[150px] text-[14px] xs:text-[15px] sm:text-[16px] text-gray-600 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none overflow-y-auto overflow-x-hidden">
                <ul className="space-y-1 sm:space-y-2">
                  <li
                    onClick={() => handleContainerSelect("Spring")}
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                  >
                    Spring
                  </li>
                  <li
                    onClick={() => handleContainerSelect("FastAPI")}
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                  >
                    FastAPI
                  </li>
                  <li
                    onClick={() => handleContainerSelect("React")}
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                  >
                    React
                  </li>
                  <li
                    onClick={() => handleContainerSelect("연결하지 않음")}
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                  >
                    연결하지 않음
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-row justify-end items-center w-full max-w-[1000px] mt-40 xs:mt-44 sm:mt-48">
            <button className="w-[64px] xs:w-[80px] h-[40px] xs:h-[50px] text-[16px] xs:text-[20px] text-white bg-[#0F172A] rounded-md">
              생성
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}