import { ChangeEvent, useState, useEffect, FormEvent, Fragment } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useApolloClient } from "@apollo/client";

import { useImageCrop } from "../hooks/useImageCrop";
import {
  useEditProfileMutation,
  GetCurrentUserDocument,
  useGetPresignedUrlLazyQuery,
} from "../generated/graphql";
import Modal from "./Modal";
import ImageEditor from "./ImageEditor";
import MemberInput from "../components/MemberInput";
import ImageButton from "../components/ImageButton";
import EditProfileFormContainer from "../components/EditProfileFromContainer";
import Form from "../components/Form";
import EditProfileSubmitButton from "../components/EditProfileSubmitButton";

interface Credentials {
  id: string;
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

  const client = useApolloClient();
  const { currentUser: cachedCurrentUser } = client.readQuery({
    query: GetCurrentUserDocument,
  });
  const [credentials, setCredentials] = useState<Credentials>({
    ...cachedCurrentUser,
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

        const currentUser = data.editProfile;

        cache.writeQuery({
          data: { currentUser },
          query: GetCurrentUserDocument,
        });

        cache.modify({
          fields: {
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
    if (croppedImage && presignedUrlData) {
      const updateProfileWithAvatar = async () => {
        const { presignedUrl, key } = presignedUrlData.getPresignedUrl;
        await axios.put(presignedUrl, croppedImage, {
          headers: { "Content-Type": croppedImage.type },
        });
        const profilePictureUrl = `${process.env.NEXT_PUBLIC_AWS_S3_URL}/${key}`;
        updateProfile(profilePictureUrl);
      };

      updateProfileWithAvatar();
    }

    return () => setCroppedImage(null);
  }, [presignedUrlData]);

  return (
    <Fragment>
      <Header heading="Edit Profile" onClick={backToSidebar} />
      <EditProfileFormContainer>
        <Form onSubmit={handleSubmit}>
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

          <EditProfileSubmitButton>Update profile</EditProfileSubmitButton>
        </Form>
      </EditProfileFormContainer>
    </Fragment>
  );
};

export default EditProfile;
