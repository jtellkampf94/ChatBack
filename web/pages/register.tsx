import styled from "styled-components";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 77.5px 0;
  ${({ theme }) => theme.registerPageTheme.smallScreen`
    padding: 0;
  `};
  background-color: ${({ theme }) => theme.globalTheme.registerBackgroundGrey};
`;

const RegisterBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 50px 40px;
  border: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
  background-color: ${({ theme }) => theme.globalTheme.white};
  align-items: center;
  ${({ theme }) => theme.registerPageTheme.smallScreen`
    width: 100%;
    border: none;
    background-color: #f8f9fa;
  `};
`;

const Title = styled.h1``;

const Register: React.FC = () => {
  return (
    <Container>
      <RegisterBox>
        {/* <img
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt=""
          style={{ marginBottom: 10 }}
          height={50}
          width={50}
        /> */}
        <WhatsAppIcon
          style={{
            width: "50px",
            height: "50px",
            fill: "green",
          }}
        />
        <Title>Register</Title>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          perferendis expedita dolor! Exercitationem beatae necessitatibus ipsam
          distinctio. Autem, nostrum quis illo distinctio saepe dolorum repellat
          sit nobis officia soluta exercitationem? Cum obcaecati dolores
          excepturi nobis, aut eaque expedita ex laboriosam quasi reprehenderit
          quo reiciendis possimus. Illum necessitatibus amet officiis eaque
          obcaecati quis ea! Est possimus quod alias enim itaque laboriosam!
          autem ab repellendus sequi dolore pariatur? Iure provident quibusdam,
          nulla minima animi fugit doloribus? Molestiae autem soluta impedit eos
          reprehenderit pariatur officia cupiditate aliquid et, commodi iusto,
          ullam, facilis totam ratione eius? Recusandae suscipit saepe neque
          voluptates iusto eum autem tempora voluptatem animi libero. Rem
          corporis commodi eaque quaerat odit voluptatum sed voluptas explicabo
          nobis at? Inventore tenetur ut iusto dicta, aut autem
        </p>
      </RegisterBox>
    </Container>
  );
};

export default Register;
