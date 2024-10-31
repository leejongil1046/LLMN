import { fetchAlarmList } from "@/api/commons/header-api";
import { verifyAccessToken } from "@/api/login/login-api";
import {
  fetchLogFileList,
  fetchProjectSummaryList,
} from "@/api/project/project-api";
import { AlarmList } from "@/types/commons/header-type";
import { Nickname } from "@/types/login/login-type";
import { LogFileList, ProjectSummaryList } from "@/types/project/project-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface ProjectSummariesPageProps {
  NicknameSSR: Nickname | null;
  ProjectSummaryListSSR: ProjectSummaryList | null;
  LogFileListSSR: LogFileList | null;
  AlarmListSSR: AlarmList | null;
  unreadAlarmCount: number;
}

export interface Params extends ParsedUrlQuery {
  id: string;
}

export async function getProjectSummariesSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<ProjectSummariesPageProps>> {
  const { id } = context.params as Params;
  const page = context.query.page as string;

  if (!id) {
    throw new Error("Missing project ID");
  }
  const accessToken = context.req.cookies?.accessToken || "";

  const pageNumber = page ? Number(page) - 1 : 0;

  const [NicknameSSR, ProjectSummaryListSSR, LogFileListSSR, AlarmListSSR] =
    await Promise.all([
      verifyAccessToken(accessToken),
      fetchProjectSummaryList(Number(id), pageNumber, accessToken),
      fetchLogFileList(Number(id), accessToken),
      fetchAlarmList(accessToken),
    ]);

  if (!NicknameSSR) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const unreadAlarmCount =
    AlarmListSSR?.alarms.filter((alarm) => !alarm.isRead).length || 0;

  return {
    props: {
      NicknameSSR,
      ProjectSummaryListSSR,
      LogFileListSSR,
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}