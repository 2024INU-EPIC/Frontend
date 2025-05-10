// StopTalkingModal.tsx
import styled from "styled-components";

const ShadowBox = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgb(100, 100, 100, 0.4);

  z-index: 1;
`;

const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 71rem; // 1176px - 40px
  height: 38rem; // 648px - 40px

  background-color: #ff7b7b;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 2.5rem;

  span {
    color: white;
    font-size: 3rem;
    text-align: center;
    font-weight: bold;
  }

  z-index: 2;

  /* box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25); */
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.55));
`;

const MessageWrapper = styled.div`
  width: 71rem;
  height: 32rem;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    text-align: center;
    color: black;
    font-size: 2rem;
    font-weight: 600;
  }
`;

const StopTalkingModal = () => {
  return (
    <>
      <ShadowBox>
        <Wrapper>
          <span>Stop Talking</span>
          <MessageWrapper>
            <p>
              Your response time has ended. Stop speaking now.
              <br />
              <br />
              You automatically proceed to the next question
              <br />
              after your response has been saved. <br />
              <br />
              This may take serveral seconds.
            </p>
          </MessageWrapper>
        </Wrapper>
      </ShadowBox>
    </>
  );
};

export default StopTalkingModal;
