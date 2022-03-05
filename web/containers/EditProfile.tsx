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

import { useImageCrop } from "../hooks/useImageCrop";
import Modal from "./Modal";
import ImageEditor from "./ImageEditor";
import MemberInput from "../components/MemberInput";
import ImageButton from "../components/ImageButton";
import SubmitButton from "../components/SubmitButton";

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

interface EditProfileProps {
  backToSidebar: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ backToSidebar }) => {
  const {
    handleFileChange,
    handleClosePreview,
    croppedImage,
    setCroppedImage,
    preview,
  } = useImageCrop();
  const [credentials, setCredentials] = useState({
    username: "",
    firstName: "",
    lastName: "",
    profilePictureUrl: "",
    about: "",
  });
  const { username, firstName, lastName, profilePictureUrl, about } =
    credentials;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <Header heading="Edit Profile" onClick={backToSidebar} />

      <FormContainer>
        <EditForm onSubmit={handleSubmit}>
          <ImageButton
            placeholder="Add profile image"
            background={croppedImage ? URL.createObjectURL(croppedImage) : null}
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
            value={about}
            name="about"
            placeholder="About"
          />
          <SubmitButton>Submit</SubmitButton>
        </EditForm>
      </FormContainer>
    </Fragment>
  );
};

export default EditProfile;
