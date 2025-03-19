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

  http.get("/api/focused-learning/part1", async () => {
    return HttpResponse.json({
      status: 200,
      message: "ok",
      data: [
        {
          question1:
            "Now it’s time for your local weather forecast. Tomorrow will be very sunny, warm, and breezy. However, after the weekend is over, the weather will become cloudy and much colder. While it’s still warm, make sure to enjoy the beautiful weather and plan all your outdoor activities.",
          question2:
            "Thank you for calling Scientific Pages, home of the finest in technical and medical books. The bookstore is currently closed. For hours, directions, or information on current promotions, please press one. For all other inquiries, please leave us a message. One of our book specialists will return your call as soon as possible.",
        },
      ],
    });
  }),
];
