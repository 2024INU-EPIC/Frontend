import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/upload-audio", async ({ request }) => {
    const formData = await request.formData();
    const audioFile = formData.get("audio");

    if (!(audioFile instanceof File)) {
      return HttpResponse.json(
        { error: "Invalid audio file" },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      UserResponse:
        "Today was a beautiful day. We had a great time taking a long, long walk. In the morning. The countryside was in full bloom, yet the air was crisp and cold. Towards end of the day, clouds came in, forecasting much needed rain.",
      LowScoreWords: [
        {
          word: "countryside",
          AccuracyScore: 30,
          ErrorType: "Mispronunciation",
          LowScorePhonemes: [
            { phoneme: "k", AccuracyScore: 11 },
            { phoneme: "ʌ", AccuracyScore: 0 },
            { phoneme: "n", AccuracyScore: 19 },
            { phoneme: "t", AccuracyScore: 29 },
            { phoneme: "r", AccuracyScore: 40 },
            { phoneme: "ɪ", AccuracyScore: 30 },
            { phoneme: "s", AccuracyScore: 18 },
            { phoneme: "aɪ", AccuracyScore: 48 },
          ],
        },
        {
          word: "towards",
          AccuracyScore: 72,
          ErrorType: "None",
          LowScorePhonemes: [
            { phoneme: "ə", AccuracyScore: 77 },
            { phoneme: "t", AccuracyScore: 20 },
            { phoneme: "w", AccuracyScore: 18 },
            { phoneme: "ɔ", AccuracyScore: 65 },
            { phoneme: "r", AccuracyScore: 60 },
          ],
        },
      ],
    });
  }),

  http.get("/api/focused-learning/part1/:userId", async () => {
    return HttpResponse.json({
      status: 200,
      message: "ok",
      data: [
        {
          part: 1,
          text: "Welcome to the Boston International Airport. Your check-in process will take ten to fifteen minutes. In order to speed up the process, please have your identification and boardingpass ready as you approach the counter. Also, please make sure your luggage is labeled with your name, address and telephone number.",
        },
      ],
    });
  }),
];
