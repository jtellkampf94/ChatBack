import styled from "styled-components";
import { Oval } from "react-loader-spinner";

import { globalTheme } from "../themes/globalTheme";

const Container = styled("div")<{ small: boolean }>`
  width: 100%;
  height: ${(props) => (props.small ? "50px" : "100%")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface SpinnerProps {
  small?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ small }) => {
  return (
    <Container small={small ? small : false}>
      <Oval color={globalTheme.darkGreen} width={40} height={40} />
    </Container>
  );
};

export default Spinner;
