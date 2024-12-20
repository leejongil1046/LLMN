// 외부 라이브러리
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

// 프로젝트 내부 훅과 유틸리티 함수
import { cls } from "@/src/utils/class-utils";

interface SidebarProps {
  isSidebarOpen: boolean;
}

export default function Sidebar({ isSidebarOpen }: SidebarProps) {
  const router = useRouter();

  const getInitialMenu = () => {
    const path = router.pathname;
    if (path.includes("/new-item")) {
      return "new-item";
    } else if (path.includes("/project")) {
      return "project";
    } else if (path.includes("/insight")) {
      return "insight";
    } else if (path.includes("/setting")) {
      return "setting";
    }
    return null;
  };

  const [selectedMenu, setSelectedMenu] = useState<string | null>(
    getInitialMenu
  );

  const handleMenuClick = (menu: string, path: string) => {
    if (selectedMenu !== menu) {
      setSelectedMenu(menu);
      router.push(path);
    }
  };

  return (
    <div
      className={cls(
        "flex flex-col justify-start items-start fixed left-0 gap-1 w-[290px] full-height-offset mt-[69px] pt-[30px] px-3 bg-white border-r border-[#E5E7EB] z-10",
        `xl:translate-x-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`
      )}
    >
      <div
        className={cls(
          "flex flex-row justify-start items-center gap-3 w-[250px] h-[41px] px-4 rounded-full hover:bg-gray-200",
          selectedMenu === "new-item"
            ? "bg-gray-100 cursor-not-allowed"
            : "cursor-pointer"
        )}
        onClick={() => handleMenuClick("new-item", "/new-item")}
      >
        <div className="flex flex-row justify-center items-center w-[30px] h-[30px]">
          <Image
            src="/images/add.svg"
            alt="add"
            width={15}
            height={15}
            priority
          />
        </div>
        <span className="text-[20px] font-semibold">새로운 아이템</span>
      </div>
      <div
        className={cls(
          "flex flex-row justify-start items-center gap-3 w-[250px] h-[41px] px-4 rounded-full hover:bg-gray-200",
          selectedMenu === "project"
            ? "bg-gray-100 cursor-not-allowed"
            : "cursor-pointer"
        )}
        onClick={() => handleMenuClick("project", "/project")}
      >
        <div className="flex flex-row justify-center items-center w-[30px] h-[30px]">
          <Image
            src="/images/log.svg"
            alt="log"
            width={28}
            height={28}
            className="blaock"
            priority
          />
        </div>
        <span className="text-[20px] font-semibold">로그 기록</span>
      </div>
      <div
        className={cls(
          "flex flex-row justify-start items-center gap-3 w-[250px] h-[41px] px-4 rounded-full hover:bg-gray-200",
          selectedMenu === "insight"
            ? "bg-gray-100 cursor-not-allowed"
            : "cursor-pointer"
        )}
        onClick={() => handleMenuClick("insight", "/insight")}
      >
        <div className="flex flex-row justify-center items-center w-[30px] h-[30px]">
          <Image
            src="/images/insight.svg"
            alt="insight"
            width={28}
            height={28}
            priority
          />
        </div>
        <span className="text-[20px] font-semibold">인사이트</span>
      </div>
      <div
        className={cls(
          "flex flex-row justify-start items-center gap-3 w-[250px] h-[41px] px-4 rounded-full hover:bg-gray-200",
          selectedMenu === "setting"
            ? "bg-gray-100 cursor-not-allowed"
            : "cursor-pointer"
        )}
        onClick={() => handleMenuClick("setting", "/setting")}
      >
        <div className="flex flex-row justify-center items-center w-[30px] h-[30px]">
          <Image
            src="/images/setting.svg"
            alt="setting"
            width={28}
            height={28}
            priority
          />
        </div>
        <span className="text-[20px] font-semibold">설정</span>
      </div>
    </div>
  );
}
