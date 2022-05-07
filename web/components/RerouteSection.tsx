import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.globalTheme.secondaryGreyFont};
  font-size: 14px;
`;

const RegisterLink = styled.span`
  color: blue;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

interface RerouteSectionProps {
  text: string;
  href: string;
}

const RerouteSection: React.FC<RerouteSectionProps> = ({ text, href }) => {
  return (
    <Container>
      <Text>
        {text}{" "}
        <Link href={href} passHref>
          <RegisterLink>here.</RegisterLink>
        </Link>
      </Text>
    </Container>
  );
};

export default RerouteSection;
