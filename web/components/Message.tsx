import styled from "styled-components";
import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { globalTheme } from "../themes/globalTheme";

const Container = styled.div`
  background-color: ${({ theme }) => theme.globalTheme.messageGreen};
  display: flex;
  flex-direction: column;
  border-radius: 7.5px;
  padding: 8px 9px;
`;

const MessageFooter = styled.span`
  width: 100%;
  display: flex;
`;

const Text = styled.span``;

const DateSent = styled.span`
  font-size: 11px;
  margin-right: 5px;
  color: ${({ theme }) => theme.globalTheme.greyMessageColor};
`;

interface MessageProps {
  sending?: boolean;
  sent?: boolean;
  delivered?: boolean;
  read?: boolean;
}

const Message: React.FC<MessageProps> = ({
  sending,
  sent,
  delivered,
  read,
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
    <Container>
      <Text>This is a message</Text>
      <MessageFooter>
        <DateSent>05:55</DateSent>
        {renderIcon()}
      </MessageFooter>
    </Container>
  );
};

export default Message;
