// utils/tts.ts
export const fetchTTSBlob = async (text: string): Promise<Blob> => {
  const res = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error("TTS 변환 실패");

  return await res.blob();
};

export const playAudioBlob = (blob: Blob): Promise<void> => {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.onended = () => resolve();
    audio.play();
  });
};
