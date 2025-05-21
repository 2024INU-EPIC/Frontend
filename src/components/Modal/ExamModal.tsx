// ExamModal.tsx
import React, { useEffect, useState } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalContent,
  ModalCloseButton,
  ModalTitleArea,
  PartArea,
  ResultArea,
} from "./ExamModal.styled";
import PassageBody from "../PassageBody";
import ScoreBody from "../ScoreBody";
import ImageBody from "../ImageBody";
import ReplyBody from "../ReplyBody";
import ScoreBodyGeneral from "../ScoreBodyGeneral";
import SituationBody from "../SituationBody";
import MultipleReplyBody from "../MultipleReplyBox";
import QuestionBody from "../QuestionBody";
import { formatDate } from "../../utils/dateUtils";
import axios from "axios";

const partQuestionCounts = [2, 2, 3, 3, 1];

// wrongWordScore 생성 함수
function getWrongWordScore(issueWords: any[] = []) {
  return (issueWords || []).reduce(
    (acc: Record<string, { score: number; errorType: string }>, item: any) => {
      acc[item.word.toLowerCase()] = {
        score: item.AccuracyScore,
        errorType: item.ErrorType,
      };
      return acc;
    },
    {},
  );
}

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  examDate: string | null;
  gradeId: number;
}

const ExamModal: React.FC<ExamModalProps> = ({
  isOpen,
  onClose,
  examDate,
  gradeId,
}) => {
  // API에서 받아온 평가결과/문제 상태
  const [parsedEvaluations, setParsedEvaluations] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      (async () => {
        try {
          const response = await axios.get(`/api/mocktest/${gradeId}/detail`);
          // evaluations: string[] (각 문항별 JSON string)
          // questions: [{situationImage, situationText, questions: string[]}, ...]
          const { evaluations, questions } = response.data;
          console.log(evaluations);
          setParsedEvaluations(evaluations.map((e: string) => JSON.parse(e)));
          setQuestions(questions);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      })();
    }
  }, [isOpen, gradeId]);

  // 파트별 문항 인덱스 계산
  const getPartIndexes = (partIdx: number) => {
    const start = partQuestionCounts
      .slice(0, partIdx)
      .reduce((a, b) => a + b, 0);
    return Array.from(
      { length: partQuestionCounts[partIdx] },
      (_, i) => start + i,
    );
  };

  return isOpen ? (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitleArea>
          <ModalTitle>
            {examDate ? `${formatDate(examDate)} 1회차 모의고사` : ""} &nbsp;
            &nbsp; IM1
          </ModalTitle>
          <ModalCloseButton onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M10.6663 31.6663L8.33301 29.333L17.6663 19.9997L8.33301 10.6663L10.6663 8.33301L19.9997 17.6663L29.333 8.33301L31.6663 10.6663L22.333 19.9997L31.6663 29.333L29.333 31.6663L19.9997 22.333L10.6663 31.6663Z"
                fill="black"
              />
            </svg>
          </ModalCloseButton>
        </ModalTitleArea>
        <ModalContent>
          <PartArea>
            <p className="partInfo">Part1</p>
            {getPartIndexes(0).map((idx, qIdx) => {
              const evalData = parsedEvaluations[idx];
              const qData = questions[0]?.questions?.[qIdx] || "";
              return (
                <ResultArea key={idx}>
                  <PassageBody
                    text={qData}
                    isScoring={true}
                    wrongWordScore={getWrongWordScore(evalData?.IssueWords)}
                    questionNum={qIdx + 1}
                    totalQuestions={partQuestionCounts[0]}
                    fromPartSelect={false}
                    questionCount={qIdx + 1}
                    partId={"1"}
                  />
                  <ScoreBody
                    totalScore={Math.round(
                      [
                        evalData?.PronunciationAssessment?.AccuracyScore ?? 0,
                        evalData?.PronunciationAssessment?.CompletenessScore ??
                          0,
                        evalData?.PronunciationAssessment?.FluencyScore ?? 0,
                        evalData?.PronunciationAssessment?.ProsodyScore ?? 0,
                      ].reduce((sum, score, i, arr) => {
                        const min = Math.min(...arr);
                        return (
                          sum + (score === min ? score * 0.4 : score * 0.2)
                        );
                      }, 0),
                    )}
                    accuracy={Math.round(
                      evalData?.PronunciationAssessment?.AccuracyScore ?? 0,
                    )}
                    completeness={Math.round(
                      evalData?.PronunciationAssessment?.CompletenessScore ?? 0,
                    )}
                    fluency={Math.round(
                      evalData?.PronunciationAssessment?.FluencyScore ?? 0,
                    )}
                    prosody={Math.round(
                      evalData?.PronunciationAssessment?.ProsodyScore ?? 0,
                    )}
                  />
                </ResultArea>
              );
            })}
          </PartArea>

          <PartArea>
            <p className="partInfo">Part2</p>
            {getPartIndexes(1).map((idx, qIdx) => {
              const evalData = parsedEvaluations[idx];
              const qData = questions[1]?.questions?.[qIdx] || "";
              return (
                <ResultArea key={idx}>
                  <ImageBody
                    imageSrc={qData}
                    questionNum={qIdx + 1}
                    totalQuestions={partQuestionCounts[1]}
                    fromPartSelect={false}
                    questionCount={qIdx + 1}
                    partId={"2"}
                  />
                  <ReplyBody
                    text={evalData?.azureEvaluation?.UserResponse ?? ""}
                    wrongWordScore={getWrongWordScore(
                      evalData?.azureEvaluation?.IssueWords,
                    )}
                    isScoring={true}
                    gptText={
                      evalData?.gptEvaluation
                        ? [
                            evalData.gptEvaluation.suggestions?.grammar,
                            evalData.gptEvaluation.suggestions?.vocabulary,
                            evalData.gptEvaluation.suggestions?.topic,
                            evalData.gptEvaluation.suggestions?.eval ||
                              evalData.gptEvaluation.suggestions?.["총평"],
                          ]
                            .filter(Boolean)
                            .join("\n\n")
                        : ""
                    }
                  />
                  <ScoreBodyGeneral
                    pronunciationScore={Math.round(
                      [
                        evalData?.azureEvaluation?.PronunciationAssessment
                          ?.AccuracyScore ?? 0,
                        evalData?.azureEvaluation?.PronunciationAssessment
                          ?.FluencyScore ?? 0,
                        evalData?.azureEvaluation?.PronunciationAssessment
                          ?.ProsodyScore ?? 0,
                      ].reduce((sum, score, _, arr) => {
                        const min = Math.min(...arr);
                        return (
                          sum + (score === min ? score * 0.4 : score * 0.2)
                        );
                      }, 0),
                    )}
                    accuracy={Math.round(
                      evalData?.azureEvaluation?.PronunciationAssessment
                        ?.AccuracyScore ?? 0,
                    )}
                    fluency={Math.round(
                      evalData?.azureEvaluation?.PronunciationAssessment
                        ?.FluencyScore ?? 0,
                    )}
                    prosody={Math.round(
                      evalData?.azureEvaluation?.PronunciationAssessment
                        ?.ProsodyScore ?? 0,
                    )}
                    contentScore={Math.round(
                      ((evalData?.gptEvaluation?.vocabulary ?? 0) +
                        (evalData?.gptEvaluation?.grammar ?? 0) +
                        (evalData?.gptEvaluation?.topic ?? 0)) /
                        3,
                    )}
                    grammar={evalData?.gptEvaluation?.grammar ?? 0}
                    topic={evalData?.gptEvaluation?.topic ?? 0}
                    voca={evalData?.gptEvaluation?.vocabulary ?? 0}
                  />
                </ResultArea>
              );
            })}
          </PartArea>

          <PartArea>
            <p className="partInfo">Part3</p>

            <div style={{ height: "5rem" }}></div>
            <SituationBody
              stage="scoring"
              partNum={3}
              situationText={questions[2]?.situationText ?? ""}
              questionText={""}
              questionNum={5}
              totalQuestions={11}
              questionCount={1}
              partId={"3"}
            />

            {getPartIndexes(2).map((idx, qIdx) => {
              const evalData = parsedEvaluations[idx];
              const qData = questions[2]?.questions?.[qIdx] || "";
              return (
                <ResultArea key={idx}>
                  <MultipleReplyBody
                    questionNum={qIdx + 5}
                    questionText={qData}
                    contentText={evalData?.azureEvaluation?.UserResponse ?? ""}
                    isScoring={true}
                    wrongWordScore={getWrongWordScore(
                      evalData?.azureEvaluation?.IssueWords,
                    )}
                    feedback={
                      evalData?.gptEvaluation
                        ? [
                            evalData.gptEvaluation.suggestions?.grammar,
                            evalData.gptEvaluation.suggestions?.vocabulary,
                            evalData.gptEvaluation.suggestions?.topic,
                            evalData.gptEvaluation.suggestions?.eval ||
                              evalData.gptEvaluation.suggestions?.["총평"],
                          ]
                            .filter(Boolean)
                            .join("\n\n")
                        : ""
                    }
                  />
                  <ScoreBodyGeneral
                    pronunciationScore={Math.round(
                      [
                        evalData?.azureEvaluation?.PronunciationAssessment
                          ?.AccuracyScore ?? 0,
                        evalData?.azureEvaluation?.PronunciationAssessment
                          ?.FluencyScore ?? 0,
                        evalData?.azureEvaluation?.PronunciationAssessment
                          ?.ProsodyScore ?? 0,
                      ].reduce((sum, score, _, arr) => {
                        const min = Math.min(...arr);
                        return (
                          sum + (score === min ? score * 0.4 : score * 0.2)
                        );
                      }, 0),
                    )}
                    accuracy={Math.round(
                      evalData?.azureEvaluation?.PronunciationAssessment
                        ?.AccuracyScore ?? 0,
                    )}
                    fluency={Math.round(
                      evalData?.azureEvaluation?.PronunciationAssessment
                        ?.FluencyScore ?? 0,
                    )}
                    prosody={Math.round(
                      evalData?.azureEvaluation?.PronunciationAssessment
                        ?.ProsodyScore ?? 0,
                    )}
                    contentScore={Math.round(
                      ((evalData?.gptEvaluation?.vocabulary ?? 0) +
                        (evalData?.gptEvaluation?.grammar ?? 0) +
                        (evalData?.gptEvaluation?.topic ?? 0)) /
                        3,
                    )}
                    grammar={evalData?.gptEvaluation?.grammar ?? 0}
                    topic={evalData?.gptEvaluation?.topic ?? 0}
                    voca={evalData?.gptEvaluation?.vocabulary ?? 0}
                  />
                </ResultArea>
              );
            })}
          </PartArea>

          <PartArea>
            <p className="partInfo">Part4</p>
            <div style={{ height: "5rem" }}></div>
            <SituationBody
              stage="scoring"
              partNum={4}
              situationText={questions[3]?.situationText ?? ""}
              imageSrc={questions[3]?.situationImage ?? ""}
              questionText={""}
              questionNum={8}
              totalQuestions={11}
              questionCount={1}
              partId={"4"}
            />
            {getPartIndexes(3).map((idx, qIdx) => {
              const evalData = parsedEvaluations[idx];
              const qData = questions[3]?.questions?.[qIdx] || "";
              return (
                <ResultArea key={idx}>
                  <MultipleReplyBody
                    questionNum={qIdx + 8}
                    questionText={qData}
                    contentText={evalData?.azureEvaluation?.UserResponse ?? ""}
                    isScoring={true}
                    wrongWordScore={getWrongWordScore(
                      evalData?.azureEvaluation?.IssueWords,
                    )}
                    feedback={
                      evalData?.gptEvaluation
                        ? [
                            evalData.gptEvaluation.suggestions?.grammar,
                            evalData.gptEvaluation.suggestions?.vocabulary,
                            evalData.gptEvaluation.suggestions?.topic,
                            evalData.gptEvaluation.suggestions?.eval ||
                              evalData.gptEvaluation.suggestions?.["총평"],
                          ]
                            .filter(Boolean)
                            .join("\n\n")
                        : ""
                    }
                  />
                  <ScoreBodyGeneral
                    pronunciationScore={Math.round(
                      [
                        evalData?.azureEvaluation?.PronunciationAssessment
                          ?.AccuracyScore ?? 0,
                        evalData?.azureEvaluation?.PronunciationAssessment
                          ?.FluencyScore ?? 0,
                        evalData?.azureEvaluation?.PronunciationAssessment
                          ?.ProsodyScore ?? 0,
                      ].reduce((sum, score, _, arr) => {
                        const min = Math.min(...arr);
                        return (
                          sum + (score === min ? score * 0.4 : score * 0.2)
                        );
                      }, 0),
                    )}
                    accuracy={Math.round(
                      evalData?.azureEvaluation?.PronunciationAssessment
                        ?.AccuracyScore ?? 0,
                    )}
                    fluency={Math.round(
                      evalData?.azureEvaluation?.PronunciationAssessment
                        ?.FluencyScore ?? 0,
                    )}
                    prosody={Math.round(
                      evalData?.azureEvaluation?.PronunciationAssessment
                        ?.ProsodyScore ?? 0,
                    )}
                    contentScore={Math.round(
                      ((evalData?.gptEvaluation?.vocabulary ?? 0) +
                        (evalData?.gptEvaluation?.grammar ?? 0) +
                        (evalData?.gptEvaluation?.topic ?? 0)) /
                        3,
                    )}
                    grammar={evalData?.gptEvaluation?.grammar ?? 0}
                    topic={evalData?.gptEvaluation?.topic ?? 0}
                    voca={evalData?.gptEvaluation?.vocabulary ?? 0}
                  />
                </ResultArea>
              );
            })}
          </PartArea>

          <PartArea>
            <p className="partInfo">Part5</p>
            {getPartIndexes(4).map((idx, qIdx) => {
              const evalData = parsedEvaluations[idx];
              const qData = questions[4]?.questions?.[qIdx] || "";
              return (
                <ResultArea key={idx}>
                  <QuestionBody
                    text={qData}
                    questionNum={11}
                    totalQuestions={11}
                    questionCount={1}
                    fromPartSelect={false}
                    partId={"5"}
                  />
                  <ReplyBody
                    text={evalData?.azureEvaluation?.UserResponse ?? ""}
                    wrongWordScore={getWrongWordScore(
                      evalData?.azureEvaluation?.IssueWords,
                    )}
                    isScoring={true}
                    gptText={
                      evalData?.gptEvaluation
                        ? [
                            evalData.gptEvaluation.suggestions?.grammar,
                            evalData.gptEvaluation.suggestions?.vocabulary,
                            evalData.gptEvaluation.suggestions?.topic,
                            evalData.gptEvaluation.suggestions?.eval ||
                              evalData.gptEvaluation.suggestions?.["총평"],
                          ]
                            .filter(Boolean)
                            .join("\n\n")
                        : ""
                    }
                  />
                  <ScoreBodyGeneral
                    pronunciationScore={Math.round(
                      [
                        evalData?.azureEvaluation?.PronunciationAssessment
                          ?.AccuracyScore ?? 0,
                        evalData?.azureEvaluation?.PronunciationAssessment
                          ?.FluencyScore ?? 0,
                        evalData?.azureEvaluation?.PronunciationAssessment
                          ?.ProsodyScore ?? 0,
                      ].reduce((sum, score, _, arr) => {
                        const min = Math.min(...arr);
                        return (
                          sum + (score === min ? score * 0.4 : score * 0.2)
                        );
                      }, 0),
                    )}
                    accuracy={Math.round(
                      evalData?.azureEvaluation?.PronunciationAssessment
                        ?.AccuracyScore ?? 0,
                    )}
                    fluency={Math.round(
                      evalData?.azureEvaluation?.PronunciationAssessment
                        ?.FluencyScore ?? 0,
                    )}
                    prosody={Math.round(
                      evalData?.azureEvaluation?.PronunciationAssessment
                        ?.ProsodyScore ?? 0,
                    )}
                    contentScore={Math.round(
                      ((evalData?.gptEvaluation?.vocabulary ?? 0) +
                        (evalData?.gptEvaluation?.grammar ?? 0) +
                        (evalData?.gptEvaluation?.topic ?? 0)) /
                        3,
                    )}
                    grammar={evalData?.gptEvaluation?.grammar ?? 0}
                    topic={evalData?.gptEvaluation?.topic ?? 0}
                    voca={evalData?.gptEvaluation?.vocabulary ?? 0}
                  />
                </ResultArea>
              );
            })}
          </PartArea>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  ) : null;
};

export default ExamModal;
