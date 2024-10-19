import { DashboardData } from "@/types/dashboard";

interface ApiResponse {
  success: boolean;
  code: number;
  message: string;
  result: DashboardData | null;
}

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

    const data: ApiResponse = await response.json();
    console.log("Response to pets data with auth:", data);

    return data.result;
  } catch (error) {
    console.error("Failed to fetch pets data with auth:", error);
    return null;
  }
}