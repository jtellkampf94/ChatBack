import styled from "styled-components";
import { Oval } from "react-loader-spinner";

import { globalTheme } from "../themes/globalTheme";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner: React.FC = () => {
  return (
    <Container>
      <Oval color={globalTheme.darkGreen} width={40} height={40} />
    </Container>
  );
};

export default Spinner;
