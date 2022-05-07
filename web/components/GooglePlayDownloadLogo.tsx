import Image from "next/image";

import image from "../assets/images/gpi.png";

interface GooglePlayDownloadLogoProps {
  width: number;
  height: number;
}

const GooglePlayDownloadLogo: React.FC<GooglePlayDownloadLogoProps> = ({
  width,
  height,
}) => {
  return (
    <Image
      src={image}
      alt="google_play_download_logo"
      width={width}
      height={height}
      objectFit="cover"
    />
  );
};

export default GooglePlayDownloadLogo;
