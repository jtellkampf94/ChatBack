import { ChangeEvent } from "react";
import styled from "styled-components";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

const ImageButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 32px;
`;

const ImageBackground = styled("div")<{ background: string | null }>`
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ background }) =>
    background ? `url(${background}) no-repeat ` : "#fff"};
  background-size: cover;
`;

const ImageLabel = styled.label`
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(112, 126, 134, 0.7);
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

interface CreateGroupImageButtonProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  background: string | null;
}

const CreateGroupImageButton: React.FC<CreateGroupImageButtonProps> = ({
  onChange,
  background,
}) => {
  return (
    <ImageButtonContainer>
      <ImageBackground background={background}>
        <ImageLabel htmlFor="file-upload">
          <ImageInput
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={onChange}
          />
          <IconContainer>
            <AddAPhotoIcon style={{ fontSize: "32px", fill: "#fff" }} />
            <IconCaption>Add group icon</IconCaption>
          </IconContainer>
        </ImageLabel>
      </ImageBackground>
    </ImageButtonContainer>
  );
};

export default CreateGroupImageButton;
