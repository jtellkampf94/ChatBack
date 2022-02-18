import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import { ContactType } from "../pages";
import Header from "../components/Header";

const Container = styled.div`
  width: 100%;
`;

const ImageButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 32px;
`;

const ImageButton = styled(Avatar)`
  &:hover {
    cursor: pointer;
    filter: brightness(105%);
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconCaption = styled.p`
  font-weight: 300;
  font-size: 12px;
  color: #fff;
  text-transform: uppercase;
  margin-top: 5px;
`;

interface CreateGroupProps {
  toGroupParticipants: () => void;
  selectedContacts: ContactType[];
}

const CreateGroup: React.FC<CreateGroupProps> = ({
  toGroupParticipants,
  selectedContacts,
}) => {
  return (
    <Container>
      <Header heading="New group" onClick={toGroupParticipants} />
      <ImageButtonContainer>
        <ImageButton style={{ width: "200px", height: "200px" }}>
          <IconContainer>
            <AddAPhotoIcon style={{ fontSize: "32px" }} />
            <IconCaption>Add group icon</IconCaption>
          </IconContainer>
        </ImageButton>
      </ImageButtonContainer>
    </Container>
  );
};

export default CreateGroup;
