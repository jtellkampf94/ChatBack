import { ChangeEvent, useRef, RefObject } from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";

const Header = styled.header`
  display: flex;
  background-color: ${({ theme }) => theme.globalTheme.darkGreen};
  color: ${({ theme }) => theme.globalTheme.white};
  align-items: center;
  height: 50px;
  padding: 0 24px;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  outline: none;
  border: none;
  margin-right: 24px;

  &:hover {
    cursor: pointer;
  }
`;

const Heading = styled.h1`
  font-size: 19px;
  font-weight: 500;
`;

const UploadButton = styled.button`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 14px;
  color: ${({ theme }) => theme.globalTheme.white};

  &:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  display: none;
`;

interface ImageEditorHeaderProps {
  close: () => void;
  changeFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageEditorHeader: React.FC<ImageEditorHeaderProps> = ({
  close,
  changeFile,
}) => {
  const inputRef = useRef() as RefObject<HTMLInputElement>;

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <Header>
      <CloseButton onClick={close}>
        <CloseIcon style={{ fill: "#b2d8d1" }} />
      </CloseButton>

      <Heading>Drag image to adjust</Heading>

      <UploadButton onClick={handleClick}>
        <Input
          type="file"
          onChange={changeFile}
          ref={inputRef}
          accept="image/*"
        />
        Upload
      </UploadButton>
    </Header>
  );
};

export default ImageEditorHeader;
