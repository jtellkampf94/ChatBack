import styled from "styled-components";

import WhatsAppLogo from "../assets/images/whats-app-logo.svg";

const Header = styled.div`
  background-color: ${({ theme }) => theme.globalTheme.darkGreen};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  border-top: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  border-left: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  border-right: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  height: 80px;
  margin-top: 20px;
  flex-shrink: 0;
`;

const FormHeader: React.FC = () => {
  return (
    <Header>
      <WhatsAppLogo />
    </Header>
  );
};

export default FormHeader;
