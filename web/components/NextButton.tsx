import styled from "styled-components";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const Container = styled("div")<{ withoutLine: boolean }>`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: ${(props) =>
    props.withoutLine
      ? "none"
      : `1px solid ${props.theme.globalTheme.greyLineColor}`};
`;

const Button = styled.button`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  background-color: ${({ theme }) => theme.globalTheme.buttonGreen};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(105%);
    cursor: pointer;
  }
`;

interface NextButtonProps {
  onClick?: () => void;
  withoutLine?: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick, withoutLine }) => {
  return (
    <Container withoutLine={withoutLine ? true : false}>
      <Button type={onClick ? "button" : "submit"} onClick={onClick}>
        <ArrowForwardIcon style={{ fill: "#fff", fontSize: "24px" }} />
      </Button>
    </Container>
  );
};

export default NextButton;
