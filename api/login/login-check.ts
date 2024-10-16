export const requestLoginToken = async (email: string, password: string) => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 쿠키를 포함하여 요청
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json(); // 먼저 JSON 데이터를 추출합니다.

    if (!response.ok) {
      // 응답이 200이 아닌 경우, data에서 오류 메시지와 코드를 포함한 예외를 던집니다.
      throw new Error(
        JSON.stringify({ code: data.code, message: data.message })
      );
    }

    console.log("Response to login request, accessToken:", data);
    return data.result;
  } catch (error) {
    // 오류가 발생한 경우, 오류 메시지를 콘솔에 출력합니다.
    console.error("Failed to fetch login request, accessToken:", error);

    // 오류를 다시 던져서, 호출하는 쪽에서 처리할 수 있게 합니다.
    throw error;
  }
};
