import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

const Container = styled.div`
  padding: 10px 24px 10px 16px;
  height: 77px;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.globalTheme.hoverGrey};
  }
`;

const Text = styled.p`
  margin-left: 16px;
`;

interface AddToGroupProps {
  onClick: () => void;
}

const AddToGroup: React.FC<AddToGroupProps> = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <Avatar
        style={{ width: "52px", height: "52px", backgroundColor: "#00a884" }}
      >
        <GroupAddIcon style={{ width: "32px", height: "32px" }} />
      </Avatar>
      <Text>New Group</Text>
    </Container>
  );
};

export default AddToGroup;
