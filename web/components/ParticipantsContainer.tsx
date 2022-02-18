import styled from "styled-components";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const NextButtonContainer = styled.div`
  align-self: flex-end;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
`;

const NextButton = styled.button`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  background-color: #00a884;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(105%);
    cursor: pointer;
  }
`;

interface ParticipantsContainerProps {
  showButton: boolean;
  onClick: () => void;
}

const ParticipantsContainer: React.FC<ParticipantsContainerProps> = ({
  children,
  showButton,
  onClick,
}) => {
  return (
    <Container>
      {children}
      {showButton && (
        <NextButtonContainer>
          <NextButton onClick={onClick}>
            <ArrowForwardIcon style={{ fill: "#fff", fontSize: "24px" }} />
          </NextButton>
        </NextButtonContainer>
      )}
    </Container>
  );
};

export default ParticipantsContainer;
