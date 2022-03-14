import styled from "styled-components";

const Item = styled.div`
  padding: 10px 20px;

  &:hover {
    background-color: ${({ theme }) => theme.globalTheme.hoverGrey};
    cursor: pointer;
  }
`;

interface DropdownItemProps {
  onClick: (() => void) | (() => Promise<void>);
}

const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick }) => {
  return <Item onClick={onClick}>{children}</Item>;
};

export default DropdownItem;
