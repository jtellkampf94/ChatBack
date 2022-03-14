import styled from "styled-components";
import { Oval } from "react-loader-spinner";

import { globalTheme } from "../themes/globalTheme";

const Button = styled.button`
  color: ${({ theme }) => theme.globalTheme.white};
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  background-color: #25d366;
  height: 34px;
  margin-top: 10px;
  outline: none;
  border-radius: 3px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    filter: brightness(105%);
  }
`;

interface SubmitButtonProps {
  loading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, loading }) => {
  return (
    <Button disabled={loading}>
      {loading ? (
        <Oval color={globalTheme.white} height={20} width={20} />
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
