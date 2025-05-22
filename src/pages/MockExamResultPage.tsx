import React from "react";
import ScoreBody from "../components/ScoreBody";
import ScoreBodyGeneral from "../components/ScoreBodyGeneral";
import ReplyBody from "../components/ReplyBody";
import MultipleReplyBody from "../components/MultipleReplyBody";
import { useLocation, useNavigate } from "react-router-dom";
import { useMockTestStore } from "../stores/MockTestStore";
import PassageBody from "../components/PassageBody";
import ImageBody from "../components/ImageBody";
import SituationBody from "../components/SituationBody";
import StudyStatChart from "../components/StudyStatChart";
import {
  ChartArea,
  FloatingButton,
  Grade,
  GradeArea,
  GradeContainer,
  GradeTitle,
  MainContainer,
  Part2Area,
  Part3Area,
  Part4Area,
  PartArea,
  SubTitleContainer,
  TitleContainer,
} from "./MockExamResult.styled";
import QuestionBody from "../components/QuestionBody";

const MockExamResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { assessmentJsons, grade } = location.state || {};
  const parsed = assessmentJsons.map((json: string) => JSON.parse(json));
  const { partQuestions } = useMockTestStore();

  const getPronScores = (
    assess: any,
  ): {
    accuracy: number;
    fluency: number;
    prosody: number;
    completeness?: number;
    pronunciationScore: number;
  } => ({
    accuracy: Math.round(assess.AccuracyScore),
    fluency: Math.round(assess.FluencyScore),
    prosody: Math.round(assess.ProsodyScore),
    completeness: assess.CompletenessScore
      ? Math.round(assess.CompletenessScore)
      : undefined,
    pronunciationScore: Math.round(
      [assess.AccuracyScore, assess.FluencyScore, assess.ProsodyScore].reduce(
        (sum: number, score: number, _: number, arr: number[]) =>
          sum + (score === Math.min(...arr) ? score * 0.4 : score * 0.2),
        0,
      ),
    ),
  });

  const getContentScores = (
    gptEval: any,
  ): {
    voca: number;
    grammar: number;
    topic: number;
    contentScore: number;
    feedback: string;
  } => ({
    voca: Math.round(gptEval.vocabulary),
    grammar: Math.round(gptEval.grammar),
    topic: Math.round(gptEval.topic),
    contentScore: Math.round(
      (gptEval.vocabulary + gptEval.grammar + gptEval.topic) / 3,
    ),
    feedback: [
      gptEval.suggestions.grammar,
      gptEval.suggestions.vocabulary,
      gptEval.suggestions.topic,
      gptEval.suggestions.eval || gptEval.suggestions["총평"],
    ].join("\n\n"),
  });

  //GPT 응답내용
  const renderGeneralScore = (
    data: any,
    questionNum: number,
    questionText: string,
  ): JSX.Element => {
    const pron = getPronScores(data.azureEvaluation.PronunciationAssessment);
    const content = getContentScores(data.gptEvaluation);
    const wrongWordScore = (data.azureEvaluation.IssueWords || []).reduce(
      (
        acc: Record<string, { score: number; errorType: string }>,
        word: any,
      ) => {
        if (["Mispronunciation", "Omission", "None"].includes(word.ErrorType)) {
          acc[word.word.toLowerCase()] = {
            score: word.AccuracyScore,
            errorType: word.ErrorType,
          };
        }
        return acc;
      },
      {},
    );

    return (
      <React.Fragment key={questionNum}>
        <MultipleReplyBody
          questionNum={questionNum}
          questionText={questionText}
          contentText={data.azureEvaluation.UserResponse}
          isScoring
          wrongWordScore={wrongWordScore}
          feedback={content.feedback}
        />
        <ScoreBodyGeneral {...pron} {...content} />
      </React.Fragment>
    );
  };

  return (
    <MainContainer>
      <TitleContainer>모의고사 결과</TitleContainer>
      <SubTitleContainer>모의고사 성적</SubTitleContainer>
      <GradeContainer>
        <GradeArea>
          <GradeTitle>성적</GradeTitle>
          <Grade>{grade.finalGrade}</Grade>
        </GradeArea>
        <ChartArea>
          <StudyStatChart
            scores={[
              Math.round(grade.part1Score),
              Math.round(grade.part2Score),
              Math.round(grade.part3Score),
              Math.round(grade.part4Score),
              Math.round(grade.part5Score),
            ]}
          />
        </ChartArea>
        <div></div>
      </GradeContainer>
      <SubTitleContainer>Part 1</SubTitleContainer>
      {[0, 1].map((i) => {
        const assess = parsed[i];
        const pron = getPronScores(assess.PronunciationAssessment);
        const wrongWordScore = (assess.IssueWords || []).reduce(
          (
            acc: Record<string, { score: number; errorType: string }>,
            word: any,
          ) => {
            if (
              ["Mispronunciation", "Omission", "None"].includes(word.ErrorType)
            ) {
              acc[word.word.toLowerCase()] = {
                score: word.AccuracyScore,
                errorType: word.ErrorType,
              };
            }
            return acc;
          },
          {},
        );
        return (
          <PartArea key={i}>
            <PassageBody
              text={partQuestions.part1.questions[i]}
              isScoring={true}
              wrongWordScore={wrongWordScore}
              questionNum={i + 1}
              totalQuestions={11}
              questionCount={i + 1}
              partId={"1"}
            />
            <ScoreBody
              totalScore={pron.pronunciationScore}
              accuracy={pron.accuracy}
              completeness={pron.completeness ?? 0}
              fluency={pron.fluency}
              prosody={pron.prosody}
            />
          </PartArea>
        );
      })}

      <SubTitleContainer>Part 2</SubTitleContainer>
      {[2, 3].map((i) => {
        const data = parsed[i];
        const pron = getPronScores(
          data.azureEvaluation.PronunciationAssessment,
        );
        const content = getContentScores(data.gptEvaluation);
        const wrongWordScore = (data.azureEvaluation.IssueWords || []).reduce(
          (
            acc: Record<string, { score: number; errorType: string }>,
            word: any,
          ) => {
            if (
              ["Mispronunciation", "Omission", "None"].includes(word.ErrorType)
            ) {
              acc[word.word.toLowerCase()] = {
                score: word.AccuracyScore,
                errorType: word.ErrorType,
              };
            }
            return acc;
          },
          {},
        );

        return (
          <Part2Area key={i}>
            <ImageBody
              imageSrc={partQuestions.part2.questions[i - 2]}
              questionNum={i + 1}
              totalQuestions={11}
              questionCount={i - 1}
              partId={"2"}
            />
            <ReplyBody
              text={data.azureEvaluation.UserResponse}
              wrongWordScore={wrongWordScore}
              isScoring={true}
              gptText={content.feedback}
            />
            <ScoreBodyGeneral {...pron} {...content} />
          </Part2Area>
        );
      })}

      <SubTitleContainer>Part 3</SubTitleContainer>
      <Part3Area>
        <SituationBody
          stage="scoring"
          partNum={3}
          situationText={partQuestions.part3.situationText ?? undefined}
          questionText={""}
          questionNum={5}
          totalQuestions={11}
          questionCount={1}
          partId={"3"}
        />
        {[4, 5, 6].map((i, idx) =>
          renderGeneralScore(
            parsed[i],
            5 + idx,
            partQuestions.part3.questions[idx],
          ),
        )}
      </Part3Area>

      <SubTitleContainer>Part 4</SubTitleContainer>
      <Part4Area>
        <SituationBody
          stage="scoring"
          partNum={4}
          situationText={partQuestions.part4.situationText ?? undefined}
          imageSrc={partQuestions.part4.situationImage ?? undefined}
          questionText={""}
          questionNum={8}
          totalQuestions={11}
          questionCount={1}
          partId={"4"}
        />
        {[7, 8, 9].map((i, idx) =>
          renderGeneralScore(
            parsed[i],
            8 + idx,
            partQuestions.part4.questions[idx],
          ),
        )}
      </Part4Area>

      <SubTitleContainer>Part 5</SubTitleContainer>
      <PartArea>
        <QuestionBody
          text={partQuestions.part5.questions[0]}
          questionNum={11}
          totalQuestions={11}
          questionCount={1}
          fromPartSelect={false}
          partId={"5"}
        />
        {(() => {
          const data = parsed[10]; // 마지막 문제
          const pron = getPronScores(
            data.azureEvaluation.PronunciationAssessment,
          );
          const content = getContentScores(data.gptEvaluation);
          const wrongWordScore = (data.azureEvaluation.IssueWords || []).reduce(
            (
              acc: Record<string, { score: number; errorType: string }>,
              word: any,
            ) => {
              if (
                ["Mispronunciation", "Omission", "None"].includes(
                  word.ErrorType,
                )
              ) {
                acc[word.word.toLowerCase()] = {
                  score: word.AccuracyScore,
                  errorType: word.ErrorType,
                };
              }
              return acc;
            },
            {},
          );

          return (
            <>
              <ReplyBody
                text={data.azureEvaluation.UserResponse}
                wrongWordScore={wrongWordScore}
                isScoring
                gptText={content.feedback}
              />
              <ScoreBodyGeneral {...pron} {...content} />
            </>
          );
        })()}
      </PartArea>
      <FloatingButton onClick={() => navigate("/")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M28.2325 8.23197C28.7014 7.76329 29.3371 7.5 30 7.5C30.663 7.5 31.2987 7.76329 31.7675 8.23197L46.7675 23.232L51.7675 28.232C52.2229 28.7035 52.4749 29.335 52.4692 29.9905C52.4635 30.646 52.2006 31.273 51.7371 31.7365C51.2736 32.2 50.6465 32.463 49.991 32.4687C49.3355 32.4743 48.704 32.2224 48.2325 31.767L47.5 31.0345V47.4995C47.5 48.8255 46.9733 50.0973 46.0356 51.035C45.0979 51.9727 43.8261 52.4995 42.5 52.4995H35C34.337 52.4995 33.7011 52.2361 33.2323 51.7672C32.7634 51.2984 32.5 50.6625 32.5 49.9995V42.4995H27.5V49.9995C27.5 50.6625 27.2366 51.2984 26.7678 51.7672C26.299 52.2361 25.6631 52.4995 25 52.4995H17.5C16.174 52.4995 14.9022 51.9727 13.9645 51.035C13.0268 50.0973 12.5 48.8255 12.5 47.4995V31.0345L11.7675 31.767C11.296 32.2224 10.6645 32.4743 10.009 32.4687C9.35355 32.463 8.72652 32.2 8.26299 31.7365C7.79947 31.273 7.53655 30.646 7.53086 29.9905C7.52516 29.335 7.77715 28.7035 8.23254 28.232L13.2325 23.232L28.2325 8.23197Z"
            fill="white"
          />
        </svg>
      </FloatingButton>
    </MainContainer>
  );
};

export default MockExamResultPage;
