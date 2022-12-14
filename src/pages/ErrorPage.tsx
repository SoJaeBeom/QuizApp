import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ErrorPage = () => {
  const navigate = useNavigate();

  const moveToHome = () => {
    navigate("/");
  };

  return (
    <ErrorPageLayout>
      <ErrorPageWrapper>
        <ErrorPageBox>
          <h1>잘못된 URL입니다.</h1>
          <Button onClick={moveToHome}>
            <span>홈으로 이동</span>
          </Button>
        </ErrorPageBox>
      </ErrorPageWrapper>
    </ErrorPageLayout>
  );
};

export default ErrorPage;

const ErrorPageLayout = styled.div`
  margin: auto;
`;
const ErrorPageWrapper = styled.div`
  width: 70vw;
  margin: auto;
`;

const ErrorPageBox = styled.div`
  width: 66vw;
  margin: auto;
  text-align: center;

  h1 {
    margin-top: 6vh;
    margin-bottom: 10vh;
    font-style: normal;
    font-weight: 400;
    font-size: 3vw;
    line-height: 4vh;
    color: #000000;
  }
`;

const Button = styled.button`
  width: 42vw;
  height: 12vh;
  background-color: transparent;
  border: 1px solid black;
  box-shadow: 0 5px 5px grey;
  border-radius: 9px;

  &:hover {
    border: 1px solid black;
    box-shadow: 0 15px 15px grey;
  }

  span {
    font-style: normal;
    font-weight: 400;
    font-size: 2vw;
    line-height: 4vh;
    color: #000000;
  }
`;
