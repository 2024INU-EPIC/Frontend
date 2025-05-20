import { useEffect } from "react";
import axios from "axios";
import { useMockTestStore } from "../stores/MockTestStore";

export const useMockTestCancel = (
  isMockExam: boolean,
  sessionId: string | null,
) => {
  const resetMockTest = useMockTestStore((state) => state.resetMockTest);

  useEffect(() => {
    if (!isMockExam || !sessionId) return;

    const cancelWithSendBeacon = () => {
      console.log("모의고사 취소 요청");
      const url = `/api/mocktest/${sessionId}/cancel`;
      const blob = new Blob([], { type: "application/json" });
      navigator.sendBeacon(url, blob);
    };

    const cancelWithAxios = async () => {
      try {
        await axios.post(`/api/mocktest/${sessionId}/cancel`);
        console.log("모의고사 세션 취소 성공");
      } catch (error) {
        console.error("모의고사 세션 취소 실패:", error);
      }
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      console.log("새로고침 또는 닫힘 감지");
      cancelWithSendBeacon();
      event.preventDefault();
    };

    const handlePopState = async () => {
      console.log("뒤로가기 감지");
      await cancelWithAxios();
      resetMockTest();

      alert(
        "모의고사가 비정상적으로 종료되었습니다. 메인 화면으로 이동합니다.",
      );
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isMockExam, sessionId, resetMockTest]);
};
