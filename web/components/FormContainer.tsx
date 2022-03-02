import styled from "styled-components";

const Container = styled.div`
  padding: 30px;
  width: 350px;
  display: flex;
  border: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const FormContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default FormContainer;
