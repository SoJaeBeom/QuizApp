import React from "react";
import styled from "styled-components";
import FadeLoader from "react-spinners/FadeLoader";

const Loading = () => {
  return (
    <Wrapper>
      <FadeLoader color="#36d7b7" />
    </Wrapper>
  );
};

export default Loading;

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
