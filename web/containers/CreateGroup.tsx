import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import styled from "styled-components";
import axios from "axios";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import { ContactType } from "../pages";
import Header from "../components/Header";
import {
  useGetPresignedUrlLazyQuery,
  useCreateChatMutation,
} from "../generated/graphql";

const Container = styled.div`
  width: 100%;
`;

const Form = styled.form``;

const ImageButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 32px;
`;

const ImageBackground = styled.div`
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const ImageLabel = styled.label`
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #707e86;

  &:hover {
    cursor: pointer;
    filter: brightness(105%);
  }
`;

const ImageInput = styled.input`
  display: none;
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
  const [file, setFile] = useState<File | null>(null);
  const [groupName, setGroupName] = useState("");
  const [getPresignedUrl, { data }] = useGetPresignedUrlLazyQuery();
  const [createChat] = useCreateChatMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const createGroup = async (groupAvatarUrl: string | null = null) => {
    const userIds = selectedContacts.map((contact) => Number(contact.id));
    await createChat({
      variables: { groupName, userIds, limit: 1, groupAvatarUrl },
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      await getPresignedUrl();
    } else {
      createGroup();
    }
  };

  useEffect(() => {
    if (data && file) {
      const createGroupWithAvatar = async () => {
        const { presignedUrl, key } = data.getPresignedUrl;
        await axios.put(presignedUrl, file, {
          headers: { "Content-Type": file.type },
        });
        const groupAvatarUrl = `https://jt-whatsapp-clone-bucket.s3.eu-west-2.amazonaws.com/${key}`;
        // createGroup(groupAvatarUrl)
      };

      createGroupWithAvatar();
    }
  }, [data]);

  return (
    <Container>
      <Header heading="New group" onClick={toGroupParticipants} />
      <Form onSubmit={handleSubmit}>
        <ImageButtonContainer>
          <ImageBackground>
            <ImageLabel htmlFor="file-upload">
              <ImageInput
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
              <IconContainer>
                <AddAPhotoIcon style={{ fontSize: "32px", fill: "#fff" }} />
                <IconCaption>Add group icon</IconCaption>
              </IconContainer>
            </ImageLabel>
          </ImageBackground>
        </ImageButtonContainer>
        {groupName && <button type="submit">submit</button>}
      </Form>
    </Container>
  );
};

export default CreateGroup;
