import {
  DashboardData,
  CloudInstanceList,
} from "@/types/dashboard/dashboard-type";
import Cookies from "js-cookie";

// interface ApiResponse {
//   success: boolean;
//   code: number;
//   message: string;
//   result: DashboardData | null;
// }

export async function fetchDashboardData(
  accessToken: string
): Promise<DashboardData | null> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/home`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const { result }: { result: DashboardData | null } = await response.json();
    // const data: ApiResponse = await response.json();
    // console.log("Response to pets data with auth:", data);
    return result;
  } catch (error) {
    console.error("Failed to fetch pets data with auth:", error);
    return null;
  }
}

export async function fetchCloudInstanceList(
  accessToken: string
): Promise<CloudInstanceList | null> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/cloud`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const { result }: { result: CloudInstanceList | null } =
      await response.json();

    return result;
  } catch (error) {
    console.error("Failed to fetch pets data with auth:", error);
    return null;
  }
}

export async function ChangeMonitoringCloud(
  remoteHost: string
): Promise<boolean> {
  try {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/cloud`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ remoteHost }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const { success }: { success: boolean } = await response.json();
    // const data: ApiResponse = await response.json();
    // console.log("Response to pets data with auth:", data);
    return success;
  } catch (error) {
    console.error("Failed to fetch pets data with auth:", error);
    return false;
  }
}
