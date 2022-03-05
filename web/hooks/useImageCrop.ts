import { ChangeEvent, useState, useEffect } from "react";

export const useImageCrop = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleClosePreview = () => {
    setPreview(null);
  };

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

  return {
    handleFileChange,
    handleClosePreview,
    croppedImage,
    setCroppedImage,
    preview,
  };
};
