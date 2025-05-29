import React, { useState, useEffect } from "react";

import {
  PageContainer,
  UserName,
  UserNameText,
  MainContent,
  SideBar,
  MainArea,
  LearnStat,
  StatText,
  StatGraph,
  PopupOverlay,
  PopupContainer,
  PopupTitle,
  PopupButton,
  PopupButtons,
  PopupText,
  InputArea,
  PassText,
  PassButton,
  ProfileArea,
} from "./My.styled";
import ExamModal from "../components/Modal/ExamModal";
import { useAuthStore } from "../stores/authStore";
import axios from "axios";
import ExamHistoryCard from "../components/ExamHistoryCard";
import { useUserStore } from "../stores/userStore";
import StudyStatChart from "../components/StudyStatChart";

const MyPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>("learnStat");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [examHistory, setExamHistory] = useState<any[]>([]);
  const [gradeId, setGradeId] = useState<number>(1);

  const { userId, accessToken } = useAuthStore();
  const { name } = useUserStore();

  const [grade, setGrade] = useState<any>([]);

  const PrintUserId = () => {
    console.log(userId);
  };

  const handleMenuClick = (menu: string) => {
    if (menu === "accountDelete") {
      setIsPopupVisible(true);
    } else {
      setActiveMenu(menu);
    }
  };

  useEffect(() => {
    if (activeMenu === "examRecord") {
      axios.get(`/api/mocktest/history/${userId}`).then((response) => {
        // 응답 데이터를 가공하여 scores 배열 추가
        const processed = response.data.map((exam: any) => ({
          ...exam,
          scores: [
            exam.part1Grade,
            exam.part2Grade,
            exam.part3Grade,
            exam.part4Grade,
            exam.part5Grade,
          ],
          date: exam.testDate,
          score: exam.testGrade,
        }));
        setExamHistory(processed);
        console.log(processed);
      });
    }
    fetchLearningStats();
  }, [activeMenu, userId]);

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);

    if (value === newPassword && value !== "") {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const confirmDelete = () => {
    alert("회원 탈퇴가 완료되었습니다.");
    closePopup();
  };

  const openModal = (examId: string) => {
    setSelectedExam(examId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExam(null);
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
    <PageContainer>
      <UserName>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="177"
          height="177"
          viewBox="0 0 177 177"
          fill="none"
        >
          <path
            d="M88.5 0.5C100.17 0.5 111.361 5.1357 119.613 13.3873C127.864 21.6389 132.5 32.8305 132.5 44.5C132.5 56.1695 127.864 67.3611 119.613 75.6127C111.361 83.8643 100.17 88.5 88.5 88.5C76.8305 88.5 65.6389 83.8643 57.3873 75.6127C49.1357 67.3611 44.5 56.1695 44.5 44.5C44.5 32.8305 49.1357 21.6389 57.3873 13.3873C65.6389 5.1357 76.8305 0.5 88.5 0.5ZM88.5 110.5C137.12 110.5 176.5 130.19 176.5 154.5V176.5H0.5V154.5C0.5 130.19 39.88 110.5 88.5 110.5Z"
            fill="white"
          />
        </svg>
        <UserNameText onClick={PrintUserId}>Hi, {name}</UserNameText>
      </UserName>
      <MainContent>
        <SideBar>
          <a
            href=""
            onClick={() => handleMenuClick("learnStat")}
            className={activeMenu === "learnStat" ? "active" : ""}
          >
            학습통계
          </a>
          <a
            href="#"
            onClick={() => handleMenuClick("examRecord")}
            className={activeMenu === "examRecord" ? "active" : ""}
          >
            시험 기록 확인
          </a>
          <a
            href="##"
            onClick={() => handleMenuClick("editProfile")}
            className={activeMenu === "editProfile" ? "active" : ""}
          >
            회원 정보 수정
          </a>
          <a
            href="###"
            onClick={() => handleMenuClick("accountDelete")}
            className={activeMenu === "accountDelete" ? "active" : ""}
          >
            회원 탈퇴
          </a>
        </SideBar>
        <MainArea>
          {activeMenu === "learnStat" && (
            <>
              <LearnStat>
                <StatText>누적 학습 통계</StatText>
                <StatGraph>
                  {grade ? (
                    <StudyStatChart
                      scores={[
                        Math.round(grade.part1),
                        Math.round(grade.part2),
                        Math.round(grade.part3),
                        Math.round(grade.part4),
                        Math.round(grade.part5),
                      ]}
                    />
                  ) : (
                    "아직 학습 데이터가 없어요. 학습을 시작해보세요."
                  )}
                </StatGraph>
              </LearnStat>
              <LearnStat>
                <StatText>자주 틀린 음소</StatText>
                <StatGraph>
                  아직 학습 데이터가 없어요. 학습을 시작해보세요.
                </StatGraph>
              </LearnStat>
            </>
          )}
          {activeMenu === "examRecord" && (
            <>
              {examHistory.length === 0 ? (
                <div>아직 시험 기록이 없어요.</div>
              ) : (
                [...examHistory]
                  .reverse()
                  .map((exam, idx) => (
                    <ExamHistoryCard
                      key={exam.id || idx}
                      exam={exam}
                      openModal={openModal}
                      setGradeId={setGradeId}
                    />
                  ))
              )}
              <ExamModal
                isOpen={isModalOpen}
                onClose={closeModal}
                examDate={selectedExam}
                gradeId={gradeId}
              />
            </>
          )}
          {activeMenu === "editProfile" && (
            <>
              <ProfileArea>
                <PassText>기존 비밀번호</PassText>
                <InputArea>
                  <input
                    placeholder="영문+숫자"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </InputArea>

                <PassText>새 비밀번호</PassText>
                <InputArea>
                  <input
                    placeholder="영문+숫자"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </InputArea>

                <PassText>새 비밀번호 확인</PassText>
                <InputArea>
                  <input
                    placeholder="영문+숫자"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      handleConfirmPasswordChange(e.target.value)
                    }
                  />
                </InputArea>
                {passwordMatch === true && (
                  <p style={{ margin: "1rem 0 -2rem 0", color: "#03C136" }}>
                    비밀번호가 일치합니다.
                  </p>
                )}
                {passwordMatch === false && (
                  <p style={{ margin: "1rem 0 -2rem 0 ", color: "#FF5151" }}>
                    비밀번호가 일치하지 않습니다.
                  </p>
                )}

                <PassButton disabled={passwordMatch !== true}>
                  비밀번호 변경
                </PassButton>
              </ProfileArea>
            </>
          )}
          {isPopupVisible && (
            <PopupOverlay>
              <PopupContainer>
                <PopupTitle>회원 탈퇴</PopupTitle>
                <PopupText>정말 탈퇴하시겠습니까?</PopupText>
                <PopupButtons>
                  <PopupButton primary onClick={confirmDelete}>
                    탈퇴
                  </PopupButton>
                  <PopupButton onClick={closePopup}>취소</PopupButton>
                </PopupButtons>
              </PopupContainer>
            </PopupOverlay>
          )}
        </MainArea>
      </MainContent>
    </PageContainer>
  );
};

export default MyPage;
