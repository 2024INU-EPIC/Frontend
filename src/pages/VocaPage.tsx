import React, { useState, useEffect } from "react";

import {
  AreaTitle,
  ButtonText,
  CardEnd,
  CardMid,
  CardStart,
  ExampleWord,
  GuideMessage,
  HighlightText,
  IPA,
  ListenButton,
  MainContainer,
  MoveButton,
  PageContainer,
  PhonemeArea,
  PhonemeTab,
  PhonemeTabArea,
  PhoneticAlpha,
  PracticeAfter,
  PracticeArea,
  PracticeBefore,
  RecordButton,
  ScoreArea,
  ScoreText,
  SentenceDetail,
  SentenceIPA,
  SentenceText,
  TablePData,
  TablePHead,
  TableSData,
  TableSHead,
  WordArea,
  WordButtonArea,
  WordCard,
  WordDetail,
  WordIPA,
  WordTable,
  WordText,
} from "./Voca.styled";

const phonemesData = [
  { phoneme: "ə", ipa: "[ax]", words: ["certain", "umbrella", "photographer"] },
  { phoneme: "ae", ipa: "[ae]", words: ["snack", "cat", "bag"] },
  { phoneme: "ʌ", ipa: "[ah]", words: ["cup", "luck", "shut"] },
  { phoneme: "oʊ", ipa: "[ow]", words: ["know", "go", "phone"] },
  { phoneme: "ɛ", ipa: "[eh]", words: ["head", "said", "get"] },
];

const VocaPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [cardClicked, setCardClicked] = useState(false); // 단어/문장 전환
  const [showGuide, setShowGuide] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPracticeStarted, setIsPracticeStarted] = useState(false);

  useEffect(() => {
    if (phonemesData.length > 0) {
      setSelectedTab(phonemesData[0].phoneme); // 첫 번째 phoneme 선택
    }
  }, []);

  const handleTabClick = (phoneme: string) => {
    setSelectedTab(phoneme);
    setCurrentWordIndex(0); // 음소탭을 선택하면 해당 음소의 첫 번째 단어로 초기화
  };

  const handleMoveLeft = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 전파 방지
    if (selectedTab) {
      const phonemeData = phonemesData.find((p) => p.phoneme === selectedTab);
      if (phonemeData) {
        setCurrentWordIndex((prev) =>
          prev > 0 ? prev - 1 : phonemeData.words.length - 1,
        );
      }
    }
  };

  const handleMoveRight = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 전파 방지
    if (selectedTab) {
      const phonemeData = phonemesData.find((p) => p.phoneme === selectedTab);
      if (phonemeData) {
        setCurrentWordIndex((prev) =>
          prev < phonemeData.words.length - 1 ? prev + 1 : 0,
        );
      }
    }
  };

  const selectedPhonemeData = phonemesData.find(
    (p) => p.phoneme === selectedTab,
  );

  const currentWord = selectedPhonemeData
    ? selectedPhonemeData.words[currentWordIndex]
    : "";

  const handleWordClick = () => {
    setCardClicked(true);
    setShowGuide(false);
  };

  const handleSentenceClick = () => {
    setCardClicked(false);
  };

  const handlePracticeClick = () => {
    setIsPracticeStarted(true); // PracticeArea 클릭 시 연습 시작
  };

  return (
    <PageContainer>
      <MainContainer>
        <PhonemeArea>
          <AreaTitle>
            Audrey님의 취약음소 <HighlightText>Top 5</HighlightText>
          </AreaTitle>
          <PhonemeTabArea>
            {phonemesData.map(({ phoneme, ipa, words }) => (
              <PhonemeTab
                key={phoneme}
                isActive={selectedTab === phoneme}
                onClick={() => handleTabClick(phoneme)}
              >
                <PhoneticAlpha isActive={selectedTab === phoneme}>
                  {phoneme}
                  <IPA isActive={selectedTab === phoneme}>{ipa}</IPA>
                </PhoneticAlpha>
                <ExampleWord isActive={selectedTab === phoneme}>
                  {words.join(", ") + ", ..."}
                </ExampleWord>
              </PhonemeTab>
            ))}
          </PhonemeTabArea>
        </PhonemeArea>
        <WordArea>
          <AreaTitle>
            음소 <HighlightText>{selectedTab}</HighlightText>가 포함된{" "}
            {cardClicked ? " 문장" : " 단어"}
          </AreaTitle>
          {!cardClicked && (
            <WordCard onClick={handleWordClick}>
              <CardStart>
                <MoveButton onClick={(event) => handleMoveLeft(event)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <rect
                      width="48"
                      height="48"
                      transform="translate(48 48) rotate(-180)"
                      fill="white"
                    />
                    <path
                      d="M45 24C45 19.8466 43.7684 15.7865 41.4609 12.333C39.1534 8.87959 35.8736 6.18797 32.0364 4.59853C28.1991 3.00909 23.9767 2.59322 19.9031 3.40351C15.8295 4.2138 12.0877 6.21385 9.15076 9.15075C6.21386 12.0877 4.2138 15.8295 3.40351 19.9031C2.59322 23.9767 3.00909 28.1991 4.59853 32.0363C6.18797 35.8736 8.87959 39.1533 12.333 41.4609C15.7865 43.7684 19.8466 45 24 45C29.5695 45 34.911 42.7875 38.8492 38.8492C42.7875 34.911 45 29.5695 45 24ZM36 25.5L17.775 25.5L26.145 33.9105L24 36L12 24L24 12L26.145 14.1405L17.775 22.5L36 22.5L36 25.5Z"
                      fill="#FF5151"
                    />
                  </svg>
                </MoveButton>
              </CardStart>
              <CardMid>
                <WordText>{currentWord}</WordText>
                <WordIPA>[{currentWord}]</WordIPA>
              </CardMid>
              <CardEnd>
                <ListenButton>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="25" cy="25" r="25" fill="#D9D9D9" />
                    <g transform="translate(50, 50) translate(-40, -40)">
                      <g clip-path="url(#clip0_468_1163)">
                        <path
                          d="M0 8.17614H6.59836L16.5246 0.0859375V27.9138L6.59836 19.8237H0V8.17614ZM20.2541 6.85645C22.2049 8.80728 23.1994 11.1789 23.2377 13.9712C23.2377 16.6488 22.2432 18.9439 20.2541 20.8565L18.2459 18.7909C19.623 17.4138 20.3115 15.7882 20.3115 13.9138C20.3115 12.0013 19.623 10.3373 18.2459 8.92204L20.2541 6.85645ZM23.6967 3.47121C26.5656 6.34007 28 9.80182 28 13.8565C28 17.9111 26.5656 21.392 23.6967 24.2991L21.5738 22.1762C23.8688 19.9193 25.0164 17.1557 25.0164 13.8852C25.0164 10.6147 23.8688 7.83191 21.5738 5.53681L23.6967 3.47121Z"
                          fill="black"
                        />
                      </g>
                    </g>

                    <defs>
                      <clipPath id="clip0_468_1163">
                        <rect width="28" height="28" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </ListenButton>
                <ButtonText>발음 듣기</ButtonText>
                <MoveButton onClick={(event) => handleMoveRight(event)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <rect width="48" height="48" fill="white" />
                    <path
                      d="M3 24C3 28.1534 4.23163 32.2135 6.53914 35.667C8.84665 39.1204 12.1264 41.812 15.9636 43.4015C19.8009 44.9909 24.0233 45.4068 28.0969 44.5965C32.1705 43.7862 35.9123 41.7861 38.8492 38.8492C41.7861 35.9123 43.7862 32.1705 44.5965 28.0969C45.4068 24.0233 44.9909 19.8009 43.4015 15.9636C41.812 12.1264 39.1204 8.84665 35.667 6.53914C32.2135 4.23163 28.1534 3 24 3C18.4305 3 13.089 5.21249 9.15076 9.15076C5.21249 13.089 3 18.4305 3 24ZM12 22.5H30.225L21.855 14.0895L24 12L36 24L24 36L21.855 33.8595L30.225 25.5H12V22.5Z"
                      fill="#FF5151"
                    />
                  </svg>
                </MoveButton>
                <div></div>
              </CardEnd>
              {/* 가이드 문구 (최초 로딩 시 표시 & 클릭 후 숨김) */}
              {showGuide && (
                <GuideMessage>
                  예시 문장을 보려면 카드를 클릭하세요!
                </GuideMessage>
              )}
            </WordCard>
          )}
          {cardClicked && (
            <WordCard onClick={handleSentenceClick}>
              <CardStart>
                <MoveButton onClick={handleMoveLeft}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <rect
                      width="48"
                      height="48"
                      transform="translate(48 48) rotate(-180)"
                      fill="white"
                    />
                    <path
                      d="M45 24C45 19.8466 43.7684 15.7865 41.4609 12.333C39.1534 8.87959 35.8736 6.18797 32.0364 4.59853C28.1991 3.00909 23.9767 2.59322 19.9031 3.40351C15.8295 4.2138 12.0877 6.21385 9.15076 9.15075C6.21386 12.0877 4.2138 15.8295 3.40351 19.9031C2.59322 23.9767 3.00909 28.1991 4.59853 32.0363C6.18797 35.8736 8.87959 39.1533 12.333 41.4609C15.7865 43.7684 19.8466 45 24 45C29.5695 45 34.911 42.7875 38.8492 38.8492C42.7875 34.911 45 29.5695 45 24ZM36 25.5L17.775 25.5L26.145 33.9105L24 36L12 24L24 12L26.145 14.1405L17.775 22.5L36 22.5L36 25.5Z"
                      fill="#FF5151"
                    />
                  </svg>
                </MoveButton>
              </CardStart>
              <CardMid>
                <SentenceText>Do you know where she lives?</SentenceText>
                <SentenceIPA>
                  [d uw y uw n ow w eh r sh iy l ih v z]
                </SentenceIPA>
              </CardMid>
              <CardEnd>
                <ListenButton>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="25" cy="25" r="25" fill="#D9D9D9" />
                    <g transform="translate(50, 50) translate(-40, -40)">
                      <g clip-path="url(#clip0_468_1163)">
                        <path
                          d="M0 8.17614H6.59836L16.5246 0.0859375V27.9138L6.59836 19.8237H0V8.17614ZM20.2541 6.85645C22.2049 8.80728 23.1994 11.1789 23.2377 13.9712C23.2377 16.6488 22.2432 18.9439 20.2541 20.8565L18.2459 18.7909C19.623 17.4138 20.3115 15.7882 20.3115 13.9138C20.3115 12.0013 19.623 10.3373 18.2459 8.92204L20.2541 6.85645ZM23.6967 3.47121C26.5656 6.34007 28 9.80182 28 13.8565C28 17.9111 26.5656 21.392 23.6967 24.2991L21.5738 22.1762C23.8688 19.9193 25.0164 17.1557 25.0164 13.8852C25.0164 10.6147 23.8688 7.83191 21.5738 5.53681L23.6967 3.47121Z"
                          fill="black"
                        />
                      </g>
                    </g>

                    <defs>
                      <clipPath id="clip0_468_1163">
                        <rect width="28" height="28" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </ListenButton>
                <ButtonText>발음 듣기</ButtonText>
                <MoveButton onClick={handleMoveRight}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <rect width="48" height="48" fill="white" />
                    <path
                      d="M3 24C3 28.1534 4.23163 32.2135 6.53914 35.667C8.84665 39.1204 12.1264 41.812 15.9636 43.4015C19.8009 44.9909 24.0233 45.4068 28.0969 44.5965C32.1705 43.7862 35.9123 41.7861 38.8492 38.8492C41.7861 35.9123 43.7862 32.1705 44.5965 28.0969C45.4068 24.0233 44.9909 19.8009 43.4015 15.9636C41.812 12.1264 39.1204 8.84665 35.667 6.53914C32.2135 4.23163 28.1534 3 24 3C18.4305 3 13.089 5.21249 9.15076 9.15076C5.21249 13.089 3 18.4305 3 24ZM12 22.5H30.225L21.855 14.0895L24 12L36 24L24 36L21.855 33.8595L30.225 25.5H12V22.5Z"
                      fill="#FF5151"
                    />
                  </svg>
                </MoveButton>
                <div></div>
              </CardEnd>
            </WordCard>
          )}
          <PracticeArea>
            {!isPracticeStarted ? (
              <PracticeBefore onClick={handlePracticeClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                >
                  <path
                    d="M40 46.667C45.5333 46.667 50 42.2003 50 36.667V16.667C50 11.1337 45.5333 6.66699 40 6.66699C34.4667 6.66699 30 11.1337 30 16.667V36.667C30 42.2003 34.4667 46.667 40 46.667Z"
                    fill="white"
                  />
                  <path
                    d="M56.6667 36.667C56.6667 45.867 49.2 53.3337 40 53.3337C30.8 53.3337 23.3333 45.867 23.3333 36.667H16.6667C16.6667 48.4337 25.3667 58.1003 36.6667 59.7337V70.0003H43.3333V59.7337C54.6333 58.1003 63.3333 48.4337 63.3333 36.667H56.6667Z"
                    fill="white"
                  />
                </svg>
                연습하기
              </PracticeBefore>
            ) : (
              <PracticeAfter>
                <ScoreArea>
                  score
                  <ScoreText score={82}>82</ScoreText>
                </ScoreArea>
                {cardClicked ? (
                  <SentenceDetail>Do you know where she lives?</SentenceDetail>
                ) : (
                  <WordDetail>
                    {currentWord}
                    <WordTable>
                      <tr>
                        <TablePHead>발음</TablePHead>
                        <TablePData value="n">n</TablePData>
                        <TablePData value="o">o</TablePData>
                        <TablePData value="ʊ">ʊ</TablePData>
                      </tr>
                      <tr>
                        <TableSHead>정확도</TableSHead>
                        <TableSData score={87}>87</TableSData>
                        <TableSData score={78}>78</TableSData>
                        <TableSData score={73}>73</TableSData>
                      </tr>
                    </WordTable>
                  </WordDetail>
                )}

                <WordButtonArea>
                  <RecordButton onClick={() => setIsPracticeStarted(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg">
                      <circle cx="25" cy="25" r="25" fill="#EA5A47" />
                      <path
                        d="M16 18.667C18.2133 18.667 20 16.8803 20 14.667V6.66699C20 4.45366 18.2133 2.66699 16 2.66699C13.7867 2.66699 12 4.45366 12 6.66699V14.667C12 16.8803 13.7867 18.667 16 18.667Z"
                        fill="white"
                        transform="translate(9 9)"
                      />
                      <path
                        d="M22.6667 14.667C22.6667 18.347 19.68 21.3337 16 21.3337C12.32 21.3337 9.33334 18.347 9.33334 14.667H6.66667C6.66667 19.3737 10.1467 23.2403 14.6667 23.8937V28.0003H17.3333V23.8937C21.8533 23.2403 25.3333 19.3737 25.3333 14.667H22.6667Z"
                        fill="white"
                        transform="translate(9 9)"
                      />
                    </svg>
                  </RecordButton>
                  <p>다시 연습하기</p>
                </WordButtonArea>
              </PracticeAfter>
            )}
          </PracticeArea>
        </WordArea>
      </MainContainer>
    </PageContainer>
  );
};

export default VocaPage;
