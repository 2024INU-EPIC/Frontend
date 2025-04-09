import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/upload-audio", async ({ request }) => {
    const formData = await request.formData();
    const audioFile = formData.get("audio");
    const questionId = formData.get("questionId");
    const questionNo = formData.get("questionNo");
    const url = new URL(request.url);
    const part = url.searchParams.get("part");

    console.log("questionId:", questionId);
    console.log("questionNo:", questionNo);

    if (!(audioFile instanceof File)) {
      return HttpResponse.json(
        { error: "Invalid audio file" },
        { status: 400 },
      );
    }

    if (part === "1") {
      return HttpResponse.json({
        PronunciationAssessment: {
          AccuracyScore: 76,
          CompletenessScore: 83,
          FluencyScore: 80,
          ProsodyScore: 90,
        },
        UserResponse:
          "Now it’s time for your local weather forecast. Tomorrow will be very sunny, warm, and breezy. However, after the weekend is over, the weather will become cloudy and much colder. While it’s still warm, make sure to enjoy the beautiful weather and plan all your outdoor activities.",
        IssueWords: [
          {
            word: "forecast",
            AccuracyScore: 30,
            ErrorType: "Mispronunciation",
            LowScorePhonemes: [
              { phoneme: "f", AccuracyScore: 11 },
              { phoneme: "ɔːr", AccuracyScore: 0 },
              { phoneme: "k", AccuracyScore: 19 },
              { phoneme: "æ", AccuracyScore: 29 },
              { phoneme: "s", AccuracyScore: 40 },
              { phoneme: "t", AccuracyScore: 30 },
            ],
          },
          {
            word: "breezy",
            AccuracyScore: 72,
            ErrorType: "None",
            LowScorePhonemes: [
              { phoneme: "b", AccuracyScore: 77 },
              { phoneme: "r", AccuracyScore: 20 },
              { phoneme: "iː", AccuracyScore: 18 },
              { phoneme: "z", AccuracyScore: 65 },
              { phoneme: "i", AccuracyScore: 60 },
            ],
          },
          {
            word: "sunny",
            AccuracyScore: 63,
            ErrorType: "Omission",
            LowScorePhonemes: [],
          },
        ],
      });
    }

    return HttpResponse.json({
      azureEvaluation: {
        PronunciationAssessment: {
          AccuracyScore: 76,
          FluencyScore: 80,
          ProsodyScore: 90,
        },
        UserResponse:
          "Now it’s time for your local weather forecast. Tomorrow will be very sunny, warm, and breezy. However, after the weekend is over, the weather will become cloudy and much colder. While it’s still warm, make sure to enjoy the beautiful weather and plan all your outdoor activities.",
        IssueWords: [
          {
            word: "forecast",
            AccuracyScore: 30,
            ErrorType: "Mispronunciation",
            LowScorePhonemes: [
              { phoneme: "f", AccuracyScore: 11 },
              { phoneme: "ɔːr", AccuracyScore: 0 },
              { phoneme: "k", AccuracyScore: 19 },
              { phoneme: "æ", AccuracyScore: 29 },
              { phoneme: "s", AccuracyScore: 40 },
              { phoneme: "t", AccuracyScore: 30 },
            ],
          },
          {
            word: "breezy",
            AccuracyScore: 72,
            ErrorType: "None",
            LowScorePhonemes: [
              { phoneme: "b", AccuracyScore: 77 },
              { phoneme: "r", AccuracyScore: 20 },
              { phoneme: "iː", AccuracyScore: 18 },
              { phoneme: "z", AccuracyScore: 65 },
              { phoneme: "i", AccuracyScore: 60 },
            ],
          },
          {
            word: "sunny",
            AccuracyScore: 63,
            ErrorType: "Omission",
            LowScorePhonemes: [],
          },
        ],
      }, // 문자열로 변환
      gptEvaluation: {
        grammar: 80,
        topic: 70,
        vocabulary: 85,
        suggestions:
          "문법은 전반적으로 좋았으나 몇 가지 시제 오류가 있었습니다. 주제를 좀 더 구체적으로 표현해보세요.",
      },
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

  http.get("/api/focused-learning/part2", async () => {
    return HttpResponse.json({
      questionPart2Id: 1,
      question3: 'https://stepic077447526717.blob.core.windows.net/question/1-3.png',
      question4: 'https://stepic077447526717.blob.core.windows.net/question/1-4.png',
    });
  }),

  http.post('/api/upload-audio/part2', async ({ request }) => {
    const url = new URL(request.url);
    const questionId = url.searchParams.get('questionId');
    const questionNo = url.searchParams.get('questionNo');

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob) || file.size === 0) {
      return HttpResponse.json(
        { message: '파일이 없거나 비어 있음' },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      azureEvaluation: {
        PronunciationAssessment: {
          AccuracyScore: 76,
          FluencyScore: 80,
          ProsodyScore: 90,
        },
        UserResponse:
          "Now it’s time for your local weather forecast. Tomorrow will be very sunny, warm, and breezy. However, after the weekend is over, the weather will become cloudy and much colder. While it’s still warm, make sure to enjoy the beautiful weather and plan all your outdoor activities.",
        IssueWords: [
          {
            word: "forecast",
            AccuracyScore: 30,
            ErrorType: "Mispronunciation",
            LowScorePhonemes: [
              { phoneme: "f", AccuracyScore: 11 },
              { phoneme: "ɔːr", AccuracyScore: 0 },
              { phoneme: "k", AccuracyScore: 19 },
              { phoneme: "æ", AccuracyScore: 29 },
              { phoneme: "s", AccuracyScore: 40 },
              { phoneme: "t", AccuracyScore: 30 },
            ],
          },
          {
            word: "breezy",
            AccuracyScore: 72,
            ErrorType: "None",
            LowScorePhonemes: [
              { phoneme: "b", AccuracyScore: 77 },
              { phoneme: "r", AccuracyScore: 20 },
              { phoneme: "iː", AccuracyScore: 18 },
              { phoneme: "z", AccuracyScore: 65 },
              { phoneme: "i", AccuracyScore: 60 },
            ],
          },
          {
            word: "sunny",
            AccuracyScore: 63,
            ErrorType: "Omission",
            LowScorePhonemes: [],
          },
        ],
      }, // 문자열로 변환
      gptEvaluation: {
        grammar: 80,
        topic: 70,
        vocabulary: 85,
        suggestions:
          "문법은 전반적으로 좋았으나 몇 가지 시제 오류가 있었습니다. 주제를 좀 더 구체적으로 표현해보세요.",
      },
    });
  }),
  
  http.get("/api/focused-learning/part3", async () => {
    return HttpResponse.json({
      status: 200,
      message: "ok",
      data: [
        {
          situation:
            "Imagine that a new work colleague has recently moved to your area and would like some information about things to do. You are having a telephone conversation about your town.",
          question1:
            "What is your favorite restaurant in the area, and when did you last go there?",
          question2:
            "Would you say this area is a good place for shopping? Why or why not?",
          question3:
            "I have some friends from out of town visiting me this weekend, and they would like to see popular attractions in the area. What is the best place to take my friends, and why?",
        },
      ],
    });
  }),

  http.get("/api/focused-learning/part5", async () => {
    return HttpResponse.json({
      status: 200,
      message: "ok",
      data: [
        {
          question:
            "Do you agree or disagree with the following statement? The most famous musicians are the most talented. Give reasons or examples to support your opinion.",
        },
      ],
    });
  }),
];
