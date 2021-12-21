import styled from "styled-components";
import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { globalTheme } from "../themes/globalTheme";

const Container = styled("div")<{ isUser: boolean }>`
  background-color: ${(props) =>
    props.isUser
      ? props.theme.globalTheme.messageGreen
      : props.theme.globalTheme.hoverGrey};
  display: flex;
  flex-direction: column;
  border-radius: 7.5px;
  padding: 8px 9px;
  width: fit-content;
  margin: 10px 0;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};

  & p,
  div {
    text-align: ${(props) => (props.isUser ? "right" : "left")};
    justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  }
`;

const Header = styled("p")<{ color: undefined | string }>`
  &::first-letter {
    text-transform: uppercase;
  }
  font-weight: 700;
  font-size: 14px;
  color: ${(props) => (props.color ? props.color : "black")};
`;

const Text = styled.p``;

const MessageFooter = styled.div`
  width: 100%;
  display: flex;
`;

const DateSent = styled.p`
  font-size: 11px;
  margin-right: 5px;
  color: ${({ theme }) => theme.globalTheme.greyMessageColor};
`;

interface MessageProps {
  sending?: boolean;
  sent?: boolean;
  delivered?: boolean;
  read?: boolean;
  isUser?: boolean;
  text: string;
  sender?: string;
  color?: string;
}

const Message: React.FC<MessageProps> = ({
  sending,
  sent,
  delivered,
  read,
  isUser,
  text,
  sender,
  color,
}) => {
  const renderIcon = () => {
    const grey = globalTheme.greyCheck;
    const blue = globalTheme.readBlueCheck;
    const size = { width: "16px", height: "16px" };

    if (sending) {
      return <AccessTimeIcon style={{ fill: grey, ...size }} />;
    }

    if (sent) {
      return <DoneIcon style={{ fill: grey, ...size }} />;
    }

    if (delivered || read) {
      return <DoneAllIcon style={{ fill: delivered ? grey : blue, ...size }} />;
    }
  };

  return (
    <Container isUser={isUser ? isUser : false}>
      {sender && <Header color={color}>{sender}</Header>}
      <Text>{text}</Text>
      <MessageFooter>
        <DateSent>05:55</DateSent>
        {renderIcon()}
      </MessageFooter>
    </Container>
  );
};

export default Message;
