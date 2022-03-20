import {
  ChangeEvent,
  useState,
  useEffect,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";

import { ContactType } from "../pages";
import {
  useGetPresignedUrlLazyQuery,
  useCreateChatMutation,
  ChatFragmentFragmentDoc,
} from "../generated/graphql";
import { useImageCrop } from "../hooks/useImageCrop";
import Header from "../components/Header";
import NextButton from "../components/NextButton";
import Container from "../components/Container";
import CreateGroupForm from "../components/CreateGroupForm";
import MemberInput from "../components/MemberInput";
import ImageButton from "../components/ImageButton";
import ImageEditor from "./ImageEditor";
import Modal from "./Modal";

interface CreateGroupProps {
  toGroupParticipants: () => void;
  selectedContacts: ContactType[];
  selectChat: (selectedChatId: number) => void;
  backToSidebar: () => void;
  setSelectedContacts: Dispatch<SetStateAction<ContactType[]>>;
}

const CreateGroup: React.FC<CreateGroupProps> = ({
  toGroupParticipants,
  selectedContacts,
  selectChat,
  backToSidebar,
  setSelectedContacts,
}) => {
  const {
    handleFileChange,
    handleClosePreview,
    croppedImage,
    setCroppedImage,
    preview,
  } = useImageCrop();
  const [groupName, setGroupName] = useState("");
  const [getPresignedUrl, { data }] = useGetPresignedUrlLazyQuery();
  const [createChat] = useCreateChatMutation();

  const createGroup = async (groupAvatarUrl: string | null = null) => {
    const userIds = selectedContacts.map((contact) => Number(contact.id));
    await createChat({
      variables: { groupName, userIds, limit: 1, groupAvatarUrl },
      update: async (cache, { data }) => {
        if (!data) return cache;

        const newChat = data.createChat;

        await cache.modify({
          fields: {
            getChats(existingChats = []) {
              const newChatRef = cache.writeFragment({
                data: newChat,
                fragment: ChatFragmentFragmentDoc,
              });

              return [newChatRef, ...existingChats];
            },
            getPresignedUrl() {
              return undefined;
            },
          },
        });
        selectChat(Number(newChat.id));
      },
    });
    backToSidebar();
    setSelectedContacts([]);
    setGroupName("");
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (groupName.length === 0) return;

    if (croppedImage) {
      await getPresignedUrl();
    } else {
      createGroup();
    }
  };

  useEffect(() => {
    if (data && croppedImage) {
      const createGroupWithAvatar = async () => {
        const { presignedUrl, key } = data.getPresignedUrl;
        await axios.put(presignedUrl, croppedImage, {
          headers: { "Content-Type": croppedImage.type },
        });
        const groupAvatarUrl = `${process.env.NEXT_PUBLIC_AWS_S3_URL}/${key}`;
        createGroup(groupAvatarUrl);
      };

      createGroupWithAvatar();
    }

    return () => setCroppedImage(null);
  }, [data]);

  return (
    <Container>
      <Header heading="New group" onClick={toGroupParticipants} />
      <CreateGroupForm onSubmit={handleSubmit}>
        <ImageButton
          background={croppedImage ? URL.createObjectURL(croppedImage) : null}
          onChange={handleFileChange}
          placeholder="Add group icon"
        />
        <MemberInput
          onChange={handleTextChange}
          type="text"
          value={groupName}
          name="groupName"
          placeholder="Group Subject"
        />

        {groupName && <NextButton withoutLine />}
        <Modal open={!!preview}>
          {preview && (
            <ImageEditor
              setCroppedImage={setCroppedImage}
              imageUrl={preview}
              closePreview={handleClosePreview}
              changeFile={handleFileChange}
            />
          )}
        </Modal>
      </CreateGroupForm>
    </Container>
  );
};

export default CreateGroup;
