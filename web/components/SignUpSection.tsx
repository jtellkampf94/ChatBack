import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.globalTheme.secondaryGreyFont};
  font-size: 14px;
`;

const SignUpSection: React.FC = () => {
  return (
    <Container>
      <Text>Don't have an account? Sign up here.</Text>
    </Container>
  );
};

export default SignUpSection;
