import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Container;
