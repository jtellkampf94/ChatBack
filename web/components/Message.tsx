import styled from "styled-components";

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
  max-width: 290px;
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

const Img = styled.img`
  object-fit: cover;
  max-width: 280px;
  max-height: 230px;
  border-radius: 5px;
`;

interface MessageProps {
  isUser: boolean;
  text: string;
  sender?: string;
  color?: string;
  dateSent?: string | JSX.Element;
  imageUrl?: string;
}

const Message: React.FC<MessageProps> = ({
  isUser,
  text,
  sender,
  color,
  dateSent,
  imageUrl,
}) => {
  return (
    <Container isUser={isUser}>
      {sender && <Header color={color}>{sender}</Header>}
      {imageUrl && <Img src={imageUrl} />}
      <Text>{text}</Text>

      <MessageFooter>
        <DateSent>{dateSent}</DateSent>
      </MessageFooter>
    </Container>
  );
};

export default Message;
