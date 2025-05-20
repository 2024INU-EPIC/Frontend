const mockExamResponse = {
  sessionId: "07579294-3ae2-43eb-a031-c05c9b2be3f7",
  assessmentJsons: [
    // Part1-1
    {
      UserResponse:
        "Thank you for choosing to stay at Greenway Hotel. For your safety and convenience, we conduct conduct regular fire drills every month. Today’s drill will begin at 3 p.m and it will last approximately 10 minutes. Please follow the instructions from hotel staff and do not use.",
      PronunciationAssessment: {
        AccuracyScore: 83.0,
        FluencyScore: 95.0,
        ProsodyScore: 78.5,
        CompletenessScore: 88.0,
        PronScore: 84.6,
      },
      IssueWords: [
        {
          word: "conduct",
          AccuracyScore: 6.0,
          ErrorType: "Insertion",
          LowScorePhonemes: [
            { phoneme: "k", AccuracyScore: 50.0 },
            { phoneme: "aa", AccuracyScore: 34.0 },
            { phoneme: "n", AccuracyScore: 38.0 },
            { phoneme: "d", AccuracyScore: 0.0 },
            { phoneme: "ah", AccuracyScore: 0.0 },
            { phoneme: "k", AccuracyScore: 35.0 },
            { phoneme: "t", AccuracyScore: 68.0 },
          ],
        },
        {
          word: "fire",
          AccuracyScore: 41.0,
          ErrorType: "Mispronunciation",
          LowScorePhonemes: [
            { phoneme: "ax", AccuracyScore: 54.0 },
            { phoneme: "r", AccuracyScore: 14.0 },
          ],
        },
        {
          word: "drills",
          AccuracyScore: 51.0,
          ErrorType: "Mispronunciation",
          LowScorePhonemes: [
            { phoneme: "d", AccuracyScore: 72.0 },
            { phoneme: "ih", AccuracyScore: 10.0 },
            { phoneme: "l", AccuracyScore: 0.0 },
            { phoneme: "z", AccuracyScore: 70.0 },
          ],
        },
        {
          word: "every",
          AccuracyScore: 67.0,
          ErrorType: "None",
          LowScorePhonemes: [
            { phoneme: "eh", AccuracyScore: 53.0 },
            { phoneme: "v", AccuracyScore: 55.0 },
            { phoneme: "r", AccuracyScore: 48.0 },
            { phoneme: "iy", AccuracyScore: 72.0 },
          ],
        },
        {
          word: "today’s",
          AccuracyScore: 73.0,
          ErrorType: "None",
          LowScorePhonemes: [
            { phoneme: "t", AccuracyScore: 30.0 },
            { phoneme: "ax", AccuracyScore: 43.0 },
            { phoneme: "d", AccuracyScore: 59.0 },
          ],
        },
        {
          word: "approximately",
          AccuracyScore: 68.0,
          ErrorType: "None",
          LowScorePhonemes: [
            { phoneme: "s", AccuracyScore: 69.0 },
            { phoneme: "ax", AccuracyScore: 61.0 },
            { phoneme: "m", AccuracyScore: 49.0 },
            { phoneme: "ax", AccuracyScore: 48.0 },
          ],
        },
        {
          word: "minutes",
          AccuracyScore: 73.0,
          ErrorType: "None",
          LowScorePhonemes: [
            { phoneme: "t", AccuracyScore: 69.0 },
            { phoneme: "s", AccuracyScore: 53.0 },
          ],
        },
        {
          word: "hotel",
          AccuracyScore: 79.0,
          ErrorType: "None",
          LowScorePhonemes: [{ phoneme: "l", AccuracyScore: 66.0 }],
        },
        {
          word: "elevators",
          AccuracyScore: 0.0,
          ErrorType: "Omission",
          LowScorePhonemes: [],
        },
        {
          word: "during",
          AccuracyScore: 0.0,
          ErrorType: "Omission",
          LowScorePhonemes: [],
        },
        {
          word: "the",
          AccuracyScore: 0.0,
          ErrorType: "Omission",
          LowScorePhonemes: [],
        },
        {
          word: "drill",
          AccuracyScore: 0.0,
          ErrorType: "Omission",
          LowScorePhonemes: [],
        },
      ],
    },
    // Part1-2
    {
      UserResponse:
        "Looking for the perfect gift? Visit Lily’s Bookstore, where we offer a wide selection of novels, cookbooks and children’s stories. This week only all bestsellers are 20 perfect of Come in and find something special for yourself or loved.",
      PronunciationAssessment: {
        AccuracyScore: 81.0,
        FluencyScore: 89.0,
        ProsodyScore: 79.6,
        CompletenessScore: 82.0,
        PronScore: 82.2,
      },
      IssueWords: [
        {
          word: "perfect",
          AccuracyScore: 76.0,
          ErrorType: "None",
          LowScorePhonemes: [
            { phoneme: "eh", AccuracyScore: 72.0 },
            { phoneme: "k", AccuracyScore: 71.0 },
            { phoneme: "t", AccuracyScore: 47.0 },
          ],
        },
        {
          word: "visit",
          AccuracyScore: 20.0,
          ErrorType: "Mispronunciation",
          LowScorePhonemes: [
            { phoneme: "v", AccuracyScore: 17.0 },
            { phoneme: "ih", AccuracyScore: 11.0 },
            { phoneme: "z", AccuracyScore: 18.0 },
            { phoneme: "ih", AccuracyScore: 29.0 },
            { phoneme: "t", AccuracyScore: 24.0 },
          ],
        },
        {
          word: "lily’s",
          AccuracyScore: 45.0,
          ErrorType: "Mispronunciation",
          LowScorePhonemes: [
            { phoneme: "l", AccuracyScore: 26.0 },
            { phoneme: "ih", AccuracyScore: 32.0 },
            { phoneme: "iy", AccuracyScore: 30.0 },
            { phoneme: "z", AccuracyScore: 80.0 },
          ],
        },
        {
          word: "offer",
          AccuracyScore: 33.0,
          ErrorType: "Mispronunciation",
          LowScorePhonemes: [
            { phoneme: "ao", AccuracyScore: 22.0 },
            { phoneme: "f", AccuracyScore: 37.0 },
            { phoneme: "ax", AccuracyScore: 20.0 },
            { phoneme: "r", AccuracyScore: 52.0 },
          ],
        },
        {
          word: "novels",
          AccuracyScore: 65.0,
          ErrorType: "None",
          LowScorePhonemes: [
            { phoneme: "aa", AccuracyScore: 54.0 },
            { phoneme: "v", AccuracyScore: 61.0 },
            { phoneme: "ax", AccuracyScore: 45.0 },
            { phoneme: "l", AccuracyScore: 52.0 },
            { phoneme: "z", AccuracyScore: 59.0 },
          ],
        },
        {
          word: "bestsellers",
          AccuracyScore: 73.0,
          ErrorType: "None",
          LowScorePhonemes: [
            { phoneme: "b", AccuracyScore: 55.0 },
            { phoneme: "eh", AccuracyScore: 78.0 },
            { phoneme: "s", AccuracyScore: 79.0 },
            { phoneme: "t", AccuracyScore: 49.0 },
            { phoneme: "s", AccuracyScore: 19.0 },
            { phoneme: "eh", AccuracyScore: 71.0 },
            { phoneme: "ax", AccuracyScore: 68.0 },
            { phoneme: "r", AccuracyScore: 71.0 },
            { phoneme: "z", AccuracyScore: 57.0 },
          ],
        },
        {
          word: "20",
          AccuracyScore: 48.0,
          ErrorType: "Mispronunciation",
          LowScorePhonemes: [
            { phoneme: "t", AccuracyScore: 54.0 },
            { phoneme: "w", AccuracyScore: 66.0 },
            { phoneme: "eh", AccuracyScore: 62.0 },
            { phoneme: "n", AccuracyScore: 20.0 },
            { phoneme: "iy", AccuracyScore: 38.0 },
          ],
        },
        {
          word: "perfect",
          AccuracyScore: 22.0,
          ErrorType: "Insertion",
          LowScorePhonemes: [
            { phoneme: "p", AccuracyScore: 73.0 },
            { phoneme: "r", AccuracyScore: 11.0 },
            { phoneme: "f", AccuracyScore: 0.0 },
            { phoneme: "eh", AccuracyScore: 0.0 },
            { phoneme: "k", AccuracyScore: 0.0 },
            { phoneme: "t", AccuracyScore: 48.0 },
          ],
        },
        {
          word: "of",
          AccuracyScore: 88.0,
          ErrorType: "Insertion",
          LowScorePhonemes: [{ phoneme: "ao", AccuracyScore: 76.0 }],
        },
        {
          word: "off",
          AccuracyScore: 0.0,
          ErrorType: "Omission",
          LowScorePhonemes: [],
        },
        {
          word: "a",
          AccuracyScore: 0.0,
          ErrorType: "Omission",
          LowScorePhonemes: [],
        },
        {
          word: "one",
          AccuracyScore: 0.0,
          ErrorType: "Omission",
          LowScorePhonemes: [],
        },
      ],
    },
    // Part2-1
    {
      azureEvaluation: {
        UserResponse: "They are working in the street so many P.",
        PronunciationAssessment: {
          AccuracyScore: 86.0,
          FluencyScore: 77.0,
          ProsodyScore: 87.1,
          CompletenessScore: 100.0,
          PronScore: 80.8,
        },
        IssueWords: [
          {
            word: "many",
            AccuracyScore: 37.0,
            ErrorType: "Mispronunciation",
            LowScorePhonemes: [
              { phoneme: "m", AccuracyScore: 0.0 },
              { phoneme: "iy", AccuracyScore: 73.0 },
            ],
          },
          {
            word: "P",
            AccuracyScore: 65.0,
            ErrorType: "None",
            LowScorePhonemes: [{ phoneme: "iy", AccuracyScore: 5.0 }],
          },
        ],
      },
      gptEvaluation: {
        grammar: 60,
        topic: 50,
        vocabulary: 40,
        suggestions: {
          grammar:
            "문법적으로 'They are working in the street'는 주어와 동사는 있지만 문장의 목적어나 부가적인 정보가 부족하여 문장을 완성하는 데 부족함이 있습니다.",
          "topic coherence":
            "제시된 문장은 거리에서 많은 사람들이 무언가를 하고 있다는 정보를 주나, 전체적으로 어떤 상황인지를 명확히 이해할 수 없습니다.",
          vocabulary:
            "'working'은 문맥에 따라 다양한 의미로 사용될 수 있지만, 여기서는 적절한 단어 선택이 아닌 것 같습니다. 더 구체적인 행동을 나타내는 단어를 사용할 수 있습니다.",
          eval: "전체적으로 완성되지 않은 비문으로 보이며, 명확하지 않은 주제를 가지고 있습니다. 문장 구조와 어휘 선택을 개선할 필요가 있습니다.",
        },
      },
    },
    // Part2-2
    {
      azureEvaluation: {
        UserResponse: "There are two people one woman is staring at Unearthed.",
        PronunciationAssessment: {
          AccuracyScore: 90.0,
          FluencyScore: 79.0,
          ProsodyScore: 80.5,
          CompletenessScore: 100.0,
          PronScore: 81.5,
        },
        IssueWords: [
          {
            word: "unearthed",
            AccuracyScore: 49.0,
            ErrorType: "Mispronunciation",
            LowScorePhonemes: [
              { phoneme: "ah", AccuracyScore: 56.0 },
              { phoneme: "th", AccuracyScore: 54.0 },
              { phoneme: "t", AccuracyScore: 12.0 },
            ],
          },
        ],
      },
      gptEvaluation: {
        grammar: 50,
        topic: 30,
        vocabulary: 40,
        suggestions: {
          grammar:
            "문법적으로 부사나 어미의 사용이 부족하며, 주어와 술어의 연결이 부자연스럽습니다. 'one woman is staring at Unearthed' 부분은 문맥상 부자연스럽습니다.",
          "topic coherence":
            "주제가 명확하지 않으며, 'Unearthed'라는 단어가 문맥에 잘 맞지 않습니다. 주제를 좀 더 명확히 할 필요가 있습니다.",
          vocabulary:
            "어휘 사용이 적절하지 않습니다. 'Unearthed'라는 단어가 이 문장에 어울리지 않으며, 내용 전달이 불명확합니다.",
          eval: "전반적으로 문장 구조와 주제가 명확하지 않아 이해하기 어렵습니다. 어휘 선택도 자연스럽지 않아 전체적인 맥락 전달이 부족합니다.",
        },
      },
    },
    // Part3-1
    {
      azureEvaluation: {
        UserResponse: "I like thriller movies. It is so fantastic, I love it.",
        PronunciationAssessment: {
          AccuracyScore: 89.0,
          FluencyScore: 98.0,
          ProsodyScore: 77.7,
          CompletenessScore: 100.0,
          PronScore: 84.0,
        },
        IssueWords: [
          {
            word: "thriller",
            AccuracyScore: 51.0,
            ErrorType: "Mispronunciation",
            LowScorePhonemes: [
              { phoneme: "th", AccuracyScore: 50.0 },
              { phoneme: "ih", AccuracyScore: 42.0 },
              { phoneme: "l", AccuracyScore: 36.0 },
            ],
          },
          {
            word: "fantastic",
            AccuracyScore: 70.0,
            ErrorType: "None",
            LowScorePhonemes: [
              { phoneme: "f", AccuracyScore: 68.0 },
              { phoneme: "n", AccuracyScore: 79.0 },
              { phoneme: "k", AccuracyScore: 28.0 },
            ],
          },
        ],
      },
      gptEvaluation: {
        grammar: 85,
        topic: 70,
        vocabulary: 60,
        suggestions: {
          grammar:
            "문법적으로 간단한 오류는 없으나, 문장의 연결이 다소 매끄럽지 않게 느껴질 수 있습니다. 'It is so fantastic, I love it.' 부분은 'I love them because they are so fantastic.'와 같이 약간 수정하면 더 자연스럽습니다.",
          "topic coherence":
            "제공된 상황과 질문에 대한 답변이 불충분합니다. 영화의 구체적인 장르와 이유에 대한 설명이 필요합니다. 예를 들어 'Because they have exciting plots that keep me on the edge of my seat.'와 같이 이유를 덧붙이는 것이 좋습니다.",
          vocabulary:
            "사용된 어휘가 매우 일반적입니다. 'fantastic' 대신 'gripping', 'enthralling' 등의 더 구체적이고 다양한 형용사를 사용할 수 있습니다.",
          eval: "전반적으로 문법적으로 큰 문제는 없으나, 답변의 일관성이 떨어지고 어휘의 다양성이 부족합니다. 영화에 대한 더 구체적인 설명과 다양한 어휘의 사용으로 개선할 필요가 있습니다.",
        },
      },
    },
    // Part3-2
    {
      azureEvaluation: {
        UserResponse:
          "I got the movies 3 * a week. I usually go with my parents.",
        PronunciationAssessment: {
          AccuracyScore: 90.0,
          FluencyScore: 89.0,
          ProsodyScore: 82.6,
          CompletenessScore: 100.0,
          PronScore: 85.4,
        },
        IssueWords: [
          {
            word: "usually",
            AccuracyScore: 46.0,
            ErrorType: "Mispronunciation",
            LowScorePhonemes: [
              { phoneme: "y", AccuracyScore: 29.0 },
              { phoneme: "uw", AccuracyScore: 44.0 },
              { phoneme: "uw", AccuracyScore: 43.0 },
            ],
          },
        ],
      },
      gptEvaluation: {
        grammar: 70,
        topic: 80,
        vocabulary: 75,
        suggestions: {
          grammar:
            "문법적으로 'I got the movies 3 * a week.' 부분에서 'got' 대신 'go to'가 사용되어야 합니다. 정확한 문장은 'I go to the movies 3 times a week.'가 됩니다.",
          "topic coherence":
            "'분명한 질문은 영화에 얼마나 자주 가며 누구와 함께 가는지입니다. 이 질문에 관해 잘 답변하셨습니다. 그러나 조금 더 추가적인 정보나 설명을 덧붙이면 더 좋을 것입니다.",
          vocabulary:
            "'go with my parents.'라고 말하는 대신, 'accompany'와 같은 더 풍부한 표현을 사용할 수 있습니다.",
          eval: "이 발화는 문법적인 실수가 있으며, 주제에 꽤 잘 맞춰 대답하였으나 더 풍부한 어휘를 사용하면 좋겠습니다. 전반적으로, 단순한 전달에는 성공했으나 개선의 여지가 있습니다.",
        },
      },
    },
    // Part3-3
    {
      azureEvaluation: {
        UserResponse: "I'll commend Mission Impossible to my friend is good.",
        PronunciationAssessment: {
          AccuracyScore: 92.0,
          FluencyScore: 67.0,
          ProsodyScore: 82.5,
          CompletenessScore: 100.0,
          PronScore: 75.1,
        },
        IssueWords: [],
      },
      gptEvaluation: {
        grammar: 40,
        topic: 30,
        vocabulary: 30,
        suggestions: {
          grammar:
            "문장의 구조가 올바르지 않습니다. 'I'll commend Mission Impossible to my friend is good.'에서 'I'll commend'는 'I will recommend'로 수정해야 하고, 문장 끝에 'is good'은 필요 없습니다. 즉, 'I will recommend Mission Impossible to my friend.'로 수정되어야 합니다.",
          "topic coherence":
            "주어진 질문에 대한 응답으로서 추천한 영화가 좋은 이유가 포함되어 있지 않습니다. 예를 들어, 'I will recommend Mission Impossible to my friend because it has exciting action scenes and a great plot.'와 같이 이유를 설명하는 것이 필요합니다.",
          vocabulary:
            "'commend' 대신 'recommend'라는 단어가 더 적절합니다. 'commend'는 일반적으로 칭찬하다의 뜻이며 추천할 때는 'recommend'가 더 적합합니다.",
          eval: "문장에서 문법적 오류가 있고, 주제에 대한 일관된 설명이 부족하며, 단어 선택이 부적절합니다. 적절한 추천 이유와 올바른 문장 구조를 사용하는 능력을 개선할 필요가 있습니다.",
        },
      },
    },
    // Part4-1
    {
      azureEvaluation: {
        UserResponse: "The meeting date is at 9:00 AM Lisa Howard will begin.",
        PronunciationAssessment: {
          AccuracyScore: 88.0,
          FluencyScore: 67.0,
          ProsodyScore: 71.0,
          CompletenessScore: 100.0,
          PronScore: 72.0,
        },
        IssueWords: [
          {
            word: "howard",
            AccuracyScore: 49.0,
            ErrorType: "Mispronunciation",
            LowScorePhonemes: [
              { phoneme: "h", AccuracyScore: 51.0 },
              { phoneme: "aw", AccuracyScore: 30.0 },
              { phoneme: "ax", AccuracyScore: 22.0 },
              { phoneme: "d", AccuracyScore: 60.0 },
            ],
          },
          {
            word: "begin",
            AccuracyScore: 76.0,
            ErrorType: "None",
            LowScorePhonemes: [{ phoneme: "n", AccuracyScore: 63.0 }],
          },
        ],
      },
      gptEvaluation: {
        grammar: 70,
        topic: 60,
        vocabulary: 65,
        suggestions: {
          grammar:
            "문장의 시작 부분 중 'The meeting date is at 9:00 AM'에서 'at' 대신 'on'을 사용해야 합니다. 'Lisa Howard will begin'도 누가 발표를 시작하는지 명확하지 않습니다.",
          "topic coherence":
            "회의 날짜와 첫 발표의 시작 시간에 대한 질문에 명확하게 답변하지 않았습니다. 정보가 명확하게 전달되지 않았습니다.",
          vocabulary:
            "좀 더 구체적인 표현이 필요합니다. 예를 들어, 'Lisa Howard will begin the session' 같은 식으로 더 명확히 설명할 수 있습니다.",
          eval: "전체적으로 관련 정보를 명확하게 제시하지 않아 혼동됩니다. 문법과 표현을 개선하면 좋겠습니다.",
        },
      },
    },
    // Part4-2
    {
      azureEvaluation: {
        UserResponse:
          "10:00 AM to 10:15 is copied. Break scheduled it last 15 minutes.",
        PronunciationAssessment: {
          AccuracyScore: 84.0,
          FluencyScore: 78.0,
          ProsodyScore: 77.5,
          CompletenessScore: 100.0,
          PronScore: 78.9,
        },
        IssueWords: [
          {
            word: "copied",
            AccuracyScore: 54.0,
            ErrorType: "Mispronunciation",
            LowScorePhonemes: [
              { phoneme: "k", AccuracyScore: 52.0 },
              { phoneme: "d", AccuracyScore: 38.0 },
            ],
          },
          {
            word: "break",
            AccuracyScore: 70.0,
            ErrorType: "None",
            LowScorePhonemes: [{ phoneme: "b", AccuracyScore: 34.0 }],
          },
          {
            word: "last",
            AccuracyScore: 79.0,
            ErrorType: "None",
            LowScorePhonemes: [
              { phoneme: "l", AccuracyScore: 58.0 },
              { phoneme: "ae", AccuracyScore: 73.0 },
            ],
          },
          {
            word: "minutes",
            AccuracyScore: 70.0,
            ErrorType: "None",
            LowScorePhonemes: [
              { phoneme: "m", AccuracyScore: 54.0 },
              { phoneme: "ih", AccuracyScore: 71.0 },
              { phoneme: "s", AccuracyScore: 50.0 },
            ],
          },
        ],
      },
      gptEvaluation: {
        grammar: 60,
        topic: 70,
        vocabulary: 50,
        suggestions: {
          grammar:
            "문법적으로 'is copied'는 문맥상 맞지 않습니다. 'is scheduled for'와 같이 수정할 수 있습니다.",
          "topic coherence":
            "주어진 문장에서 커피 브레이크의 일정과 관련된 부분이 맞지 않습니다. 시간표에는 커피 브레이크가 10:00부터 10:15까지로 명시되어 있습니다.",
          vocabulary:
            "어휘적으로 'copied'는 문장의 의미와 맞지 않으므로 'scheduled' 또는 'planned'로 바꾸는 것이 좋습니다.",
          eval: "제공된 텍스트는 문법과 어휘 사용에서 다소 부정확합니다. 특히 커피 브레이크의 스케줄에 대한 정보가 정확하지 않으므로 원래 문맥과 맞게 수정이 필요합니다.",
        },
      },
    },
    // Part4-3
    {
      azureEvaluation: {
        UserResponse: "Product Latimer obtained will be presented by Sara Lee.",
        PronunciationAssessment: {
          AccuracyScore: 77.0,
          FluencyScore: 96.0,
          ProsodyScore: 72.0,
          CompletenessScore: 100.0,
          PronScore: 77.8,
        },
        IssueWords: [
          {
            word: "product",
            AccuracyScore: 49.0,
            ErrorType: "Mispronunciation",
            LowScorePhonemes: [
              { phoneme: "r", AccuracyScore: 34.0 },
              { phoneme: "aa", AccuracyScore: 41.0 },
              { phoneme: "d", AccuracyScore: 45.0 },
              { phoneme: "t", AccuracyScore: 43.0 },
            ],
          },
          {
            word: "latimer",
            AccuracyScore: 50.0,
            ErrorType: "Mispronunciation",
            LowScorePhonemes: [
              { phoneme: "l", AccuracyScore: 36.0 },
              { phoneme: "ax", AccuracyScore: 56.0 },
              { phoneme: "r", AccuracyScore: 34.0 },
            ],
          },
          {
            word: "obtained",
            AccuracyScore: 73.0,
            ErrorType: "None",
            LowScorePhonemes: [
              { phoneme: "n", AccuracyScore: 63.0 },
              { phoneme: "d", AccuracyScore: 59.0 },
            ],
          },
          {
            word: "presented",
            AccuracyScore: 41.0,
            ErrorType: "Mispronunciation",
            LowScorePhonemes: [
              { phoneme: "p", AccuracyScore: 47.0 },
              { phoneme: "r", AccuracyScore: 19.0 },
              { phoneme: "ax", AccuracyScore: 27.0 },
              { phoneme: "z", AccuracyScore: 34.0 },
              { phoneme: "eh", AccuracyScore: 35.0 },
              { phoneme: "n", AccuracyScore: 43.0 },
            ],
          },
        ],
      },
      gptEvaluation: {
        grammar: 75,
        topic: 80,
        vocabulary: 70,
        suggestions: {
          grammar:
            "문장에 약간의 문법적 오류가 있습니다. 'Product Latimer obtained'는 부자연스러운 표현입니다. 아마도 'The product obtained by Latimer'나 'The product Latimer has obtained'가 더 적절할 수 있습니다.",
          "topic coherence":
            "주제가 명확하게 전달되지만 문맥상 제품과 발표자의 연관성이 더 분명해질 필요가 있습니다.",
          vocabulary:
            "어휘 선택은 간단하지만 'obtained' 대신 'developed' 또는 'introduced' 같은 적절한 동사를 사용할 수 있습니다.",
          eval: "전반적으로 내용이 명확하지만 문법과 어휘 선택을 개선할 수 있습니다.",
        },
      },
    },
    // Part5-1
    {
      azureEvaluation: {
        UserResponse: "I like a real good.",
        PronunciationAssessment: {
          AccuracyScore: 80.0,
          FluencyScore: 71.0,
          ProsodyScore: 75.5,
          CompletenessScore: 100.0,
          PronScore: 73.7,
        },
        IssueWords: [
          {
            word: "a",
            AccuracyScore: 56.0,
            ErrorType: "Mispronunciation",
            LowScorePhonemes: [{ phoneme: "ey", AccuracyScore: 56.0 }],
          },
          {
            word: "real",
            AccuracyScore: 61.0,
            ErrorType: "None",
            LowScorePhonemes: [
              { phoneme: "r", AccuracyScore: 26.0 },
              { phoneme: "iy", AccuracyScore: 76.0 },
            ],
          },
        ],
      },
      gptEvaluation: {
        grammar: 60,
        topic: 40,
        vocabulary: 50,
        suggestions: {
          grammar:
            "문법적으로, 문장이 어색하게 표현되었습니다. 'I like a real good.'는 'I really like it'이라고 하는 것이 더 자연스러울 것입니다.",
          "topic coherence":
            "주제가 영화 추천에 대한 것이라면, 구체적인 영화 제목이나 이유가 포함되어야 하나, 문장에서는 그것이 없어서 주제의 전달력이 떨어집니다.",
          vocabulary:
            "사용된 어휘가 부족하고 다소 모호합니다. 'real good' 대신 구체적인 표현이나 형용사를 사용하면 더 풍부한 문장이 될 것입니다.",
          eval: "문법적으로 다소 어색하며, 영화 추천이라는 주제에 맞는 구체적인 내용이 부족합니다. 보다 명확한 어휘를 사용하여 정보를 전달하는 것이 필요합니다.",
        },
      },
    },
  ],
  grade: {
    part1Score: 84.35,
    part2Score: 67.96000000000001,
    part3Score: 75.18666666666667,
    part4Score: 74.03333333333335,
    part5Score: 65.3,
    finalGrade: "140 IH",
  },
};

export default mockExamResponse;
