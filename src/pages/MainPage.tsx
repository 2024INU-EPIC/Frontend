import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Main.styled";
import tLogo from "../assets/img/toeicLogo.svg";
import tClip from "../assets/img/testClip.png";
import pClip from "../assets/img/partClip.png";
import wClip from "../assets/img/wordClip.png";
import axios from "axios";
import { useUserStore } from "../stores/userStore";
import { useAuthStore } from "../stores/authStore";
import { useMockTestStore } from "../stores/MockTestStore";
import StudyStatChart from "../components/StudyStatChart";
import { GradationBarBox } from "../components/GradationBarBox";

const Main: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { setUserInfo, name, level } = useUserStore();
  const { userId, accessToken } = useAuthStore();
  const [grade, setGrade] = useState<any>([]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        navigate("/login");
        return;
      }
      const response = await axios.get(`/api/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const { name, level } = response.data;
      setUserInfo(name, level);
    };
    fetchUser();
    fetchLearningStats();
  }, [accessToken, navigate, setUserInfo, userId]);

  const scrollToSection = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleMockClick = async () => {
    try {
      const res = await axios.post(`/api/mocktest/start?userId=${userId}`);
      const { sessionId, mocktestId, part1, part2, part3, part4, part5 } =
        res.data;

      const { setSessionInfo, setPartQuestions } = useMockTestStore.getState();

      setSessionInfo(sessionId, mocktestId);
      setPartQuestions(1, part1);
      setPartQuestions(2, part2);
      setPartQuestions(3, part3);
      setPartQuestions(4, part4);
      setPartQuestions(5, part5);

      navigate("/mock");
    } catch (err) {
      console.error("모의고사 시작 실패:", err);
    }
  };

  const handlePartClick = () => {
    navigate("/partselect");
  };

  const handleVocaClick = () => {
    navigate("/voca");
  };

  const fetchLearningStats = async () => {
    try {
      const response = await axios.get(`/api/stats/learning/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log(response.data);
      setGrade(response.data);
    } catch (error) {
      console.error("Error fetching learning stats:", error);
    }
  };

  return (
    <S.mainContainer>
      <S.userRank>
        <img src={tLogo} alt="toeic speaking and writing tests" />
        <S.userRankText>
          {name}님의 등급 {level}
        </S.userRankText>
      </S.userRank>
      <S.midContent>
        <S.learnStat>
          <S.statText>최근 학습 기록</S.statText>
          <S.statGraph>
            {grade ? (
              <>
                <GradationBarBox testGrade={grade.lastGrade} />
                <StudyStatChart
                  scores={[
                    Math.round(grade.part1),
                    Math.round(grade.part2),
                    Math.round(grade.part3),
                    Math.round(grade.part4),
                    Math.round(grade.part5),
                  ]}
                />
              </>
            ) : (
              "아직 학습 데이터가 없어요. 학습을 시작해보세요."
            )}
          </S.statGraph>
        </S.learnStat>
        <S.dailyWord>
          <div>오늘의 단어</div>
          <S.changeWord>
            Impressed
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
            >
              <path d="M12.031 1.06256C11.71 1.06356 11.355 1.20756 11.031 1.53056L5.312 7.99956H1C0.449 7.99956 0 8.44856 0 8.99956V16.9996C0 17.5506 0.449 17.9996 1 17.9996H5.313L11 24.4376C12 25.4376 13 24.9256 13 23.5626V2.27956C13 1.48856 12.567 1.05756 12.031 1.06056V1.06256ZM19.281 3.06256C19.0683 3.09966 18.8734 3.2046 18.7253 3.36168C18.5772 3.51876 18.4839 3.71956 18.4593 3.93405C18.4348 4.14854 18.4803 4.36522 18.5891 4.55168C18.698 4.73815 18.8642 4.8844 19.063 4.96856C20.5509 5.71622 21.801 6.86371 22.6731 8.28228C23.5451 9.70086 24.0046 11.3344 24 12.9996C24 16.5236 22 19.5496 19.062 21.0306C18.9283 21.0771 18.806 21.1515 18.7032 21.2488C18.6004 21.3461 18.5194 21.4641 18.4656 21.5951C18.4118 21.726 18.3865 21.8669 18.3912 22.0084C18.3959 22.1498 18.4306 22.2887 18.493 22.4158C18.5554 22.5428 18.644 22.6552 18.7531 22.7455C18.8622 22.8357 18.9892 22.9018 19.1257 22.9393C19.2622 22.9768 19.4051 22.9849 19.5449 22.963C19.6848 22.9412 19.8184 22.8899 19.937 22.8126C23.53 20.9996 26 17.2876 26 12.9996C26 8.71156 23.529 4.99956 19.937 3.18656C19.7659 3.09105 19.5704 3.04793 19.375 3.06256C19.3437 3.06109 19.3123 3.06109 19.281 3.06256ZM16.906 6.93656C16.6907 6.95237 16.4863 7.03745 16.3233 7.17906C16.1603 7.32068 16.0476 7.51124 16.0019 7.72225C15.9562 7.93326 15.98 8.15339 16.0698 8.34973C16.1596 8.54608 16.3105 8.7081 16.5 8.81156C18.043 9.77056 19 11.2896 19 12.9996C19 14.7216 18.028 16.2606 16.469 17.2186C16.3465 17.2825 16.2386 17.371 16.1521 17.4787C16.0655 17.5864 16.0022 17.7108 15.9662 17.8442C15.9301 17.9775 15.9221 18.1169 15.9426 18.2535C15.9631 18.3901 16.0117 18.521 16.0853 18.6379C16.1588 18.7548 16.2559 18.8552 16.3702 18.9328C16.4845 19.0103 16.6137 19.0633 16.7495 19.0885C16.8853 19.1136 17.0249 19.1103 17.1594 19.0789C17.2939 19.0474 17.4204 18.9884 17.531 18.9056C19.601 17.6356 21 15.4756 21 12.9996C21 10.5386 19.613 8.36656 17.562 7.09356C17.3944 6.98652 17.1988 6.93186 17 6.93656C16.9687 6.93509 16.9373 6.93509 16.906 6.93656Z" />
            </svg>
          </S.changeWord>
          <S.wordPhoneme>[ ɪmˈprest ]</S.wordPhoneme>
          <S.wordMean>인상깊게 생각하는</S.wordMean>
        </S.dailyWord>
      </S.midContent>
      <S.learnButton onClick={scrollToSection}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path d="M15.8 5.78154C12.9773 4.43388 9.03204 3.77372 3.75 3.75029C3.25185 3.74352 2.76348 3.88878 2.35 4.16669C2.01062 4.39609 1.73281 4.70537 1.541 5.06733C1.34919 5.42929 1.24926 5.83283 1.25 6.24247V28.594C1.25 30.105 2.325 31.2448 3.75 31.2448C9.30235 31.2448 14.8719 31.7636 18.2078 34.9167C18.2535 34.96 18.3108 34.989 18.3728 35C18.4347 35.011 18.4986 35.0036 18.5563 34.9786C18.6141 34.9536 18.6632 34.9122 18.6977 34.8596C18.7321 34.8069 18.7503 34.7452 18.75 34.6823V8.3456C18.7501 8.16792 18.7121 7.99228 18.6385 7.83055C18.5649 7.66883 18.4575 7.52477 18.3234 7.4081C17.5593 6.75484 16.7105 6.20772 15.8 5.78154ZM37.65 4.16435C37.2363 3.88712 36.7479 3.74268 36.25 3.75029C30.968 3.77372 27.0227 4.43075 24.2 5.78154C23.2895 6.20694 22.4405 6.75299 21.6758 7.40497C21.542 7.52181 21.4348 7.66592 21.3614 7.82763C21.288 7.98933 21.25 8.16488 21.25 8.34247V34.6808C21.25 34.7412 21.2678 34.8004 21.3012 34.8507C21.3347 34.9011 21.3822 34.9405 21.438 34.964C21.4937 34.9874 21.5551 34.9939 21.6145 34.9825C21.6739 34.9712 21.7287 34.9426 21.7719 34.9003C23.7773 32.9081 27.2969 31.2425 36.2531 31.2433C36.9162 31.2433 37.5521 30.9799 38.0209 30.511C38.4897 30.0422 38.7531 29.4063 38.7531 28.7433V6.24326C38.754 5.83281 38.6539 5.42845 38.4615 5.06588C38.2691 4.70331 37.9904 4.39369 37.65 4.16435Z" />
        </svg>
        <span>학습을 시작해볼까요?</span>
      </S.learnButton>
      <S.botContent ref={targetRef}>
        <S.learnCard onClick={handleMockClick}>
          <S.cardImg>
            <img src={tClip} alt="" />
          </S.cardImg>
          <S.cardExp>
            <h2>실전모의고사</h2>
            <div>실제 토익 스피킹 시험 환경에서 연습</div>
          </S.cardExp>
        </S.learnCard>
        <S.learnCard onClick={handlePartClick}>
          <S.cardImg>
            <img src={pClip} alt="" />
          </S.cardImg>
          <S.cardExp>
            <h2>파트별 집중학습</h2>
            <div>원하는 파트만 골라서 무한 학습!</div>
          </S.cardExp>
        </S.learnCard>
        <S.learnCard onClick={handleVocaClick}>
          <S.cardImg>
            <img src={wClip} alt="" />
          </S.cardImg>
          <S.cardExp>
            <h2>맞춤형 단어장</h2>
            <div>
              모의고사, 파트별 집중학습 데이터를 바탕으로, 자주 틀린 음소만 모아
              학습
            </div>
          </S.cardExp>
        </S.learnCard>
      </S.botContent>
    </S.mainContainer>
  );
};

export default Main;
