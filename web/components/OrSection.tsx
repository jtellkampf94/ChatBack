import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.globalTheme.greyLineColor};
`;

const OrText = styled.p`
  margin: 0 10px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.globalTheme.secondaryGreyFont};
`;

const OrSection: React.FC = () => {
  return (
    <Container>
      <Line />
      <OrText>Or</OrText>
      <Line />
    </Container>
  );
};

export default OrSection;
