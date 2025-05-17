import { create } from "zustand";

interface QuestionData {
  situationImage: string | null;
  situationText: string | null;
  questions: string[];
}

interface MockTestState {
  sessionId: string | null;
  mocktestId: number | null;
  partQuestions: {
    part1: QuestionData;
    part2: QuestionData;
    part3: QuestionData;
    part4: QuestionData;
    part5: QuestionData;
  };
  setSessionInfo: (sessionId: string, mocktestId: number) => void;
  setPartQuestions: (partNum: number, data: QuestionData) => void;
  resetMockTest: () => void;
}

const createEmptyPart = (): QuestionData => ({
  situationImage: null,
  situationText: null,
  questions: [],
});

export const useMockTestStore = create<MockTestState>((set) => ({
  sessionId: null,
  mocktestId: null,
  partQuestions: {
    part1: createEmptyPart(),
    part2: createEmptyPart(),
    part3: createEmptyPart(),
    part4: createEmptyPart(),
    part5: createEmptyPart(),
  },
  setSessionInfo: (sessionId, mocktestId) => set({ sessionId, mocktestId }),
  setPartQuestions: (partNum, data) =>
    set((state) => ({
      partQuestions: {
        ...state.partQuestions,
        [`part${partNum}`]: data,
      },
    })),
  resetMockTest: () =>
    set({
      sessionId: null,
      mocktestId: null,
      partQuestions: {
        part1: createEmptyPart(),
        part2: createEmptyPart(),
        part3: createEmptyPart(),
        part4: createEmptyPart(),
        part5: createEmptyPart(),
      },
    }),
}));
