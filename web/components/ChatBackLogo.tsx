import styled from "styled-components";
import Image from "next/image";

import ChatBackIcon from "../assets/images/chatback.png";

const Brand = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin-left: 5px;
  color: #fff;
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ChatBackLogo = () => {
  return (
    <BrandContainer>
      <Image src={ChatBackIcon} width={24} height={24} />
      <Brand>ChatBack</Brand>
    </BrandContainer>
  );
};

export default ChatBackLogo;
