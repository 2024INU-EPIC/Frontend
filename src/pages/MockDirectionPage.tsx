import React from "react";
import {
  DirectionContainer,
  DirectionTable,
  MainContainer,
  LearnButton,
} from "./MockDirection.styled";

const MockDirectionPage: React.FC = () => {
  return (
    <MainContainer>
      <h1>TOEIC Speaking Test Directions</h1>
      <DirectionContainer>
        <p>
          This is the TOEIC Speaking test. This test includes 11 questions that
          measure different aspects of your speaking ability. <br />
          The test lasts approximately 20 minutes.
        </p>
      </DirectionContainer>
      <DirectionTable>
        <thead>
          <tr>
            <th>Question</th>
            <th>Task</th>
            <th>Evaluation Criteria</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1-2</td>
            <td>Read a text aloud</td>
            <td>
              <ul>
                <li>pronunciation</li>
                <li>intonation and stress</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>3-4</td>
            <td>Describe a picture</td>
            <td>
              all of the above, plus
              <ul>
                <li>grammar</li>
                <li>vocabulary</li>
                <li>cohesion</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>5-7</td>
            <td>Respond to questions</td>
            <td>
              all of the above, plus
              <ul>
                <li>relevance of content</li>
                <li>completeness of content</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>8-10</td>
            <td>Respond to questions using information provided</td>
            <td>all of the above</td>
          </tr>
          <tr>
            <td>11</td>
            <td>Express an opinion</td>
            <td>all of the above</td>
          </tr>
        </tbody>
      </DirectionTable>
      <DirectionContainer>
        <p>
          For each type of question, you will be given specific directions,
          including the time allowed for preparation and speaking. It is to your
          advantage to say as much as you can in the time allowed. It is also
          important that you speak clearly and that you answer each question
          according to the directions.
        </p>
      </DirectionContainer>
      <LearnButton>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path d="M15.8 5.78154C12.9773 4.43388 9.03204 3.77372 3.75 3.75029C3.25185 3.74352 2.76348 3.88878 2.35 4.16669C2.01062 4.39609 1.73281 4.70537 1.541 5.06733C1.34919 5.42929 1.24926 5.83283 1.25 6.24247V28.594C1.25 30.105 2.325 31.2448 3.75 31.2448C9.30235 31.2448 14.8719 31.7636 18.2078 34.9167C18.2535 34.96 18.3108 34.989 18.3728 35C18.4347 35.011 18.4986 35.0036 18.5563 34.9786C18.6141 34.9536 18.6632 34.9122 18.6977 34.8596C18.7321 34.8069 18.7503 34.7452 18.75 34.6823V8.3456C18.7501 8.16792 18.7121 7.99228 18.6385 7.83055C18.5649 7.66883 18.4575 7.52477 18.3234 7.4081C17.5593 6.75484 16.7105 6.20772 15.8 5.78154ZM37.65 4.16435C37.2363 3.88712 36.7479 3.74268 36.25 3.75029C30.968 3.77372 27.0227 4.43075 24.2 5.78154C23.2895 6.20694 22.4405 6.75299 21.6758 7.40497C21.542 7.52181 21.4348 7.66592 21.3614 7.82763C21.288 7.98933 21.25 8.16488 21.25 8.34247V34.6808C21.25 34.7412 21.2678 34.8004 21.3012 34.8507C21.3347 34.9011 21.3822 34.9405 21.438 34.964C21.4937 34.9874 21.5551 34.9939 21.6145 34.9825C21.6739 34.9712 21.7287 34.9426 21.7719 34.9003C23.7773 32.9081 27.2969 31.2425 36.2531 31.2433C36.9162 31.2433 37.5521 30.9799 38.0209 30.511C38.4897 30.0422 38.7531 29.4063 38.7531 28.7433V6.24326C38.754 5.83281 38.6539 5.42845 38.4615 5.06588C38.2691 4.70331 37.9904 4.39369 37.65 4.16435Z" />
        </svg>
        <span>시험 시작하기</span>
      </LearnButton>
    </MainContainer>
  );
};
export default MockDirectionPage;
