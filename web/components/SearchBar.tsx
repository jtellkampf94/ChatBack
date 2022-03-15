import { ChangeEvent } from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";

import { globalTheme } from "../themes/globalTheme";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 53px;
  padding: 7px 14px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.globalTheme.searchBarColor};
  border-bottom: 1px solid ${({ theme }) => theme.globalTheme.greyLineColor};
`;

const Search = styled.div`
  background-color: white;
  border-radius: 18px;
  width: 100%;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 20px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  width: 100%;
  font-size: 15px;
  margin-left: 20px;
  height: 20px;
  &::placeholder {
    color: ${({ theme }) => theme.globalTheme.greyFontColor};
  }
`;

interface SearchBarProps {
  placeholder: string;
  onChange:
    | ((e: ChangeEvent<HTMLInputElement>) => void)
    | ((e: ChangeEvent<HTMLInputElement>) => Promise<void>);
  value: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onChange,
  value,
}) => {
  return (
    <Container>
      <Search>
        <SearchIcon fontSize="small" style={{ fill: globalTheme.iconColor }} />
        <SearchInput
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
      </Search>
    </Container>
  );
};

export default SearchBar;
