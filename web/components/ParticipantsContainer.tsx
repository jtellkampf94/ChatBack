import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ParticipantsContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ParticipantsContainer;
