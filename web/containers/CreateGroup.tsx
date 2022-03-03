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
import Header from "../components/Header";
import NextButton from "../components/NextButton";
import Container from "../components/Container";
import CreateGroupForm from "../components/CreateGroupForm";
import CreateGroupInput from "../components/CreateGroupInput";
import CreateGroupImageButton from "../components/CreateGroupImageButton";
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
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleClosePreview = () => {
    setPreview(null);
  };

  const submit = async () => {
    setPreview(null);
    if (groupName.length === 0) return;

    if (croppedImage) {
      await getPresignedUrl();
    } else {
      createGroup();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  useEffect(() => {
    if (data && croppedImage) {
      console.log(data);
      const createGroupWithAvatar = async () => {
        const { presignedUrl, key } = data.getPresignedUrl;
        await axios.put(presignedUrl, croppedImage, {
          headers: { "Content-Type": croppedImage.type },
        });
        const groupAvatarUrl = `https://jt-whatsapp-clone-bucket.s3.eu-west-2.amazonaws.com/${key}`;
        createGroup(groupAvatarUrl);
      };

      createGroupWithAvatar();
    }
  }, [data]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  return (
    <Container>
      <Header heading="New group" onClick={toGroupParticipants} />
      <CreateGroupForm onSubmit={handleSubmit}>
        <CreateGroupImageButton
          background={croppedImage ? URL.createObjectURL(croppedImage) : null}
          onChange={handleFileChange}
        />
        <CreateGroupInput onChange={handleTextChange} groupName={groupName} />

        {groupName && <NextButton withoutLine />}
        <Modal open={!!preview}>
          {preview && (
            <ImageEditor
              setCroppedImage={setCroppedImage}
              imageUrl={preview}
              closePreview={handleClosePreview}
              changeFile={handleFileChange}
              submit={submit}
            />
          )}
        </Modal>
      </CreateGroupForm>
    </Container>
  );
};

export default CreateGroup;
