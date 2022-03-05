import {
  ChangeEvent,
  useState,
  useEffect,
  FormEvent,
  Dispatch,
  SetStateAction,
  Fragment,
} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import axios from "axios";

import { useImageCrop } from "../hooks/useImageCrop";
import {
  useGetCurrentUserQuery,
  useEditProfileMutation,
  GetCurrentUserDocument,
  useGetPresignedUrlLazyQuery,
} from "../generated/graphql";
import Modal from "./Modal";
import ImageEditor from "./ImageEditor";
import MemberInput from "../components/MemberInput";
import ImageButton from "../components/ImageButton";
import SubmitButton from "../components/SubmitButton";
import QueryResult from "../components/QueryResult";

const FormContainer = styled.div`
  width: 100%;
  height: calc(100vh - 108px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px !important;
    height: 6px !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-track {
    background: hsla(0, 0%, 100%, 0.1);
  }
`;

const EditForm = styled.form`
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 40px 0;
  width: 100%;
`;

const Button = styled.button`
  background-color: #25d366;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.globalTheme.white};
  outline: none;
  border-radius: 3px;
  border: none;
  height: 34px;
  width: 130px;
  &:hover {
    cursor: pointer;
    filter: brightness(105%);
  }
`;

interface Credentials {
  username: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string | null | undefined;
  about: string | null | undefined;
}

interface EditProfileProps {
  backToSidebar: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ backToSidebar }) => {
  const { data, loading, error } = useGetCurrentUserQuery();
  const [getPresignedUrl, { data: presignedUrlData }] =
    useGetPresignedUrlLazyQuery();
  const [editProfile] = useEditProfileMutation();
  const {
    handleFileChange,
    handleClosePreview,
    croppedImage,
    setCroppedImage,
    preview,
  } = useImageCrop();
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    firstName: "",
    lastName: "",
    profilePictureUrl: null,
    about: "",
  });
  const { username, firstName, lastName, profilePictureUrl, about } =
    credentials;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const updateProfile = async (profilePictureUrl?: string) => {
    await editProfile({
      variables: { ...credentials, profilePictureUrl },
      update: async (cache, { data }) => {
        if (!data) return cache;

        const updatedUser = data.editProfile;

        await cache.modify({
          fields: {
            currentUser(user) {
              const newUserRef = cache.writeQuery({
                data: updatedUser,
                query: GetCurrentUserDocument,
              });

              return newUserRef;
            },
            getPresignedUrl() {
              return undefined;
            },
          },
        });
      },
    });

    backToSidebar();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (croppedImage) {
      await getPresignedUrl();
    } else {
      updateProfile();
    }
  };

  useEffect(() => {
    if (data?.currentUser) {
      const { username, firstName, lastName, profilePictureUrl, about } =
        data.currentUser;

      setCredentials({
        username,
        firstName,
        lastName,
        profilePictureUrl,
        about,
      });
    }
  }, [data]);

  useEffect(() => {
    if (croppedImage && presignedUrlData) {
      const updateProfileWithAvatar = async () => {
        const { presignedUrl, key } = presignedUrlData.getPresignedUrl;
        await axios.put(presignedUrl, croppedImage, {
          headers: { "Content-Type": croppedImage.type },
        });
        const profilePictureUrl = `https://jt-whatsapp-clone-bucket.s3.eu-west-2.amazonaws.com/${key}`;
        updateProfile(profilePictureUrl);
      };

      updateProfileWithAvatar();
    }

    return () => setCroppedImage(null);
  }, [presignedUrlData]);

  return (
    <Fragment>
      <Header heading="Edit Profile" onClick={backToSidebar} />
      <QueryResult loading={loading} error={error}>
        <FormContainer>
          <EditForm onSubmit={handleSubmit}>
            <ImageButton
              placeholder="Add profile image"
              background={
                croppedImage
                  ? URL.createObjectURL(croppedImage)
                  : profilePictureUrl
                  ? profilePictureUrl
                  : null
              }
              onChange={handleFileChange}
            />

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

            <MemberInput
              onChange={handleChange}
              type="text"
              value={username}
              name="username"
              placeholder="Username"
            />
            <MemberInput
              onChange={handleChange}
              type="text"
              value={firstName}
              name="firstName"
              placeholder="First name"
            />
            <MemberInput
              onChange={handleChange}
              type="text"
              value={lastName}
              name="lastName"
              placeholder="Last name"
            />
            <MemberInput
              onChange={handleChange}
              type="text"
              value={about ? about : ""}
              name="about"
              placeholder="About"
            />
            <ButtonContainer>
              <Button type="submit">Update profile</Button>
            </ButtonContainer>
          </EditForm>
        </FormContainer>
      </QueryResult>
    </Fragment>
  );
};

export default EditProfile;
