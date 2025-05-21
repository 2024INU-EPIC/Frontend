// ExamModal.tsx
import React, { useEffect } from "react";
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
import mockExamResponse from "../../mock/mockExamResponse";
import ImageBody from "../ImageBody";
import ReplyBody from "../ReplyBody";
import ScoreBodyGeneral from "../ScoreBodyGeneral";
import SituationBody from "../SituationBody";
import MultipleReplyBody from "../MultipleReplyBox";
import QuestionBody from "../QuestionBody";
import { useAuthStore } from "../../stores/authStore";
import axios from "axios";

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  examDate: string | null;
}

// 파트별 문제 개수
const partQuestionCounts = [2, 2, 3, 3, 1];

// assessmentJsons 파싱 제거, 바로 사용
const parsedAssessments = mockExamResponse.assessmentJsons;

// 파트별로 문제 배열 만들기
const partResults: any[][] = [];
let idx = 0;
for (let i = 0; i < partQuestionCounts.length; i++) {
  partResults[i] = [];
  for (let j = 0; j < partQuestionCounts[i]; j++) {
    partResults[i].push(parsedAssessments[idx]);
    idx++;
  }
}

// wrongWordScore 생성 함수
function getWrongWordScore(issueWords: any[] = []) {
  return issueWords.reduce(
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

const ExamModal: React.FC<ExamModalProps> = ({ isOpen, onClose, examDate }) => {
  const { userId } = useAuthStore();

  const result = async () => {
    const response = await axios.get(`/api/mocktest/history/${userId}`);
    const data = response.data;
    // console.log(data);
    return data;
  };

  useEffect(() => {
    if (isOpen) {
      result()
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [isOpen, userId]);

  return isOpen ? (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitleArea>
          <ModalTitle>{examDate} 1회차 모의고사 &nbsp; &nbsp; IM1 </ModalTitle>
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
          {/* Part 1 */}
          <PartArea>
            <p className="partInfo">Part1</p>
            {partResults[0].map((result, qIdx) => (
              <ResultArea key={qIdx}>
                <PassageBody
                  text={result?.UserResponse || ""}
                  isScoring={true}
                  wrongWordScore={getWrongWordScore(result?.IssueWords)}
                  questionNum={qIdx + 1}
                  totalQuestions={partQuestionCounts[0]}
                  fromPartSelect={false}
                  questionCount={1}
                  partId={"1"}
                />
                <ScoreBody
                  totalScore={Math.round(
                    [
                      result?.PronunciationAssessment?.AccuracyScore ?? 0,
                      result?.PronunciationAssessment?.CompletenessScore ?? 0,
                      result?.PronunciationAssessment?.FluencyScore ?? 0,
                      result?.PronunciationAssessment?.ProsodyScore ?? 0,
                    ].reduce((sum, score, i, arr) => {
                      const min = Math.min(...arr);
                      return sum + (score === min ? score * 0.4 : score * 0.2);
                    }, 0),
                  )}
                  accuracy={Math.round(
                    result?.PronunciationAssessment?.AccuracyScore ?? 0,
                  )}
                  completeness={Math.round(
                    result?.PronunciationAssessment?.CompletenessScore ?? 0,
                  )}
                  fluency={Math.round(
                    result?.PronunciationAssessment?.FluencyScore ?? 0,
                  )}
                  prosody={Math.round(
                    result?.PronunciationAssessment?.ProsodyScore ?? 0,
                  )}
                />
              </ResultArea>
            ))}
          </PartArea>
          <PartArea>
            <p className="partInfo">Part2</p>
            {partResults[1].map((result, qIdx) => (
              <ResultArea key={qIdx}>
                <ImageBody
                  // imageSrc=""
                  questionNum={qIdx + 1}
                  totalQuestions={partQuestionCounts[1]}
                  fromPartSelect={false}
                  questionCount={1}
                  partId={"2"}
                  // ...이미지 관련 props 필요시 추가...
                />
                <ReplyBody
                  text={result?.azureEvaluation?.UserResponse}
                  wrongWordScore={getWrongWordScore(result?.IssueWords)}
                  isScoring={true}
                  gptText={[
                    result?.gptEvaluation.suggestions.grammar,
                    result?.gptEvaluation.suggestions.vocabulary,
                    result?.gptEvaluation.suggestions.topic,
                    result?.gptEvaluation.suggestions["총평"],
                  ].join("\n\n")}
                />
                <ScoreBodyGeneral
                  pronunciationScore={Math.round(
                    [
                      result?.azureEvaluation.PronunciationAssessment
                        .AccuracyScore,
                      result?.azureEvaluation.PronunciationAssessment
                        .FluencyScore,
                      result?.azureEvaluation.PronunciationAssessment
                        .ProsodyScore,
                    ].reduce(
                      (sum, score, _, arr) =>
                        sum +
                        (score === Math.min(...arr)
                          ? score * 0.4
                          : score * 0.2),
                      0,
                    ),
                  )}
                  accuracy={Math.round(
                    result?.azureEvaluation?.PronunciationAssessment
                      ?.AccuracyScore ?? 0,
                  )}
                  fluency={Math.round(
                    result?.azureEvaluation?.PronunciationAssessment
                      ?.FluencyScore ?? 0,
                  )}
                  prosody={Math.round(
                    result?.azureEvaluation?.PronunciationAssessment
                      ?.ProsodyScore ?? 0,
                  )}
                  contentScore={Math.round(
                    (result?.gptEvaluation.vocabulary +
                      result?.gptEvaluation.grammar +
                      result?.gptEvaluation.topic) /
                      3,
                  )}
                  grammar={result?.gptEvaluation?.grammar}
                  topic={result?.gptEvaluation?.topic}
                  voca={result?.gptEvaluation?.vocabulary}
                />
              </ResultArea>
            ))}
          </PartArea>
          <PartArea>
            <p className="partInfo">Part3</p>
            {partResults[2].map((result, qIdx) => (
              <ResultArea key={qIdx}>
                {/* <SituationBody
                questionNum={5}
                totalQuestions={partQuestionCounts[2]}
                situationText="dddd"

                // ...상황 관련 props 필요시 추가...
              /> */}
                <MultipleReplyBody
                  questionNum={qIdx + 1}
                  questionText="dddd"
                  contentText={result.azureEvaluation.UserResponse}
                  isScoring={true}
                  wrongWordScore={getWrongWordScore(result.IssueWords)}
                  feedback={[
                    result.gptEvaluation.suggestions.grammar,
                    result.gptEvaluation.suggestions.vocabulary,
                    result.gptEvaluation.suggestions.topic,
                    result.gptEvaluation.suggestions["총평"],
                  ].join("\n\n")}
                />
                {/* 
                <ScoreBodyGeneral
                  pronunciationScore={Math.round(
                    result.azureEvaluation.PronunciationAssessment
                      .AccuracyScore,
                  )}
                  accuracy={Math.round(
                    result.azureEvaluation.PronunciationAssessment
                      .AccuracyScore,
                  )}
                  fluency={Math.round(
                    result.azureEvaluation.PronunciationAssessment.FluencyScore,
                  )}
                  prosody={Math.round(
                    result.azureEvaluation.PronunciationAssessment.ProsodyScore,
                  )}
                /> */}
              </ResultArea>
            ))}
          </PartArea>
          {/*<PartArea>
            <p className="partInfo">Part4</p>
            <ResultArea>
              <SituationBody
                questionNum={1}
                totalQuestions={partQuestionCounts[3]}
                // ...상황 관련 props 필요시 추가...
              />
              <MultipleReplyBody
                results={partResults[3]}
                gptEvaluations={partResults[3].map((r) => r?.gptEvaluation)}
              />
              <ScoreBodyGeneral
                accuracy={Math.round(
                  partResults[3][0]?.azureEvaluation?.PronunciationAssessment
                    ?.AccuracyScore ?? 0,
                )}
                fluency={Math.round(
                  partResults[3][0]?.azureEvaluation?.PronunciationAssessment
                    ?.FluencyScore ?? 0,
                )}
                prosody={Math.round(
                  partResults[3][0]?.azureEvaluation?.PronunciationAssessment
                    ?.ProsodyScore ?? 0,
                )}
                completeness={Math.round(
                  partResults[3][0]?.azureEvaluation?.PronunciationAssessment
                    ?.CompletenessScore ?? 0,
                )}
                grammar={partResults[3][0]?.gptEvaluation?.grammar}
                topic={partResults[3][0]?.gptEvaluation?.topic}
                vocabulary={partResults[3][0]?.gptEvaluation?.vocabulary}
              />
            </ResultArea>
          </PartArea>
          <PartArea>
            <p className="partInfo">Part5</p>
            <ResultArea>
              <QuestionBody
                questionNum={1}
                totalQuestions={partQuestionCounts[4]}
                // ...질문 관련 props 필요시 추가...
              />
              <ReplyBody
                text={partResults[4][0]?.azureEvaluation?.UserResponse}
                gptEvaluation={partResults[4][0]?.gptEvaluation}
              />
              <ScoreBodyGeneral
                accuracy={Math.round(
                  partResults[4][0]?.azureEvaluation?.PronunciationAssessment
                    ?.AccuracyScore ?? 0,
                )}
                fluency={Math.round(
                  partResults[4][0]?.azureEvaluation?.PronunciationAssessment
                    ?.FluencyScore ?? 0,
                )}
                prosody={Math.round(
                  partResults[4][0]?.azureEvaluation?.PronunciationAssessment
                    ?.ProsodyScore ?? 0,
                )}
                completeness={Math.round(
                  partResults[4][0]?.azureEvaluation?.PronunciationAssessment
                    ?.CompletenessScore ?? 0,
                )}
                grammar={partResults[4][0]?.gptEvaluation?.grammar}
                topic={partResults[4][0]?.gptEvaluation?.topic}
                vocabulary={partResults[4][0]?.gptEvaluation?.vocabulary}
              />
            </ResultArea>
          </PartArea> */}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  ) : null;
};

export default ExamModal;
