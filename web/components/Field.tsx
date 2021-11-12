import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

const Box = styled.div`
  margin-top: 15px;
  text-align: center;
`;

interface FieldProps {
  value: string;
  setState: Dispatch<SetStateAction<string>>;
  name: string;
  placeholder: string;
  label: string;
  type?: string;
  id?: string;
  maxRows?: number;
  multiline?: boolean;
}

const Field: React.FC<FieldProps> = ({
  type = "text",
  setState,
  ...restProps
}) => {
  return (
    <Box>
      <TextField
        onChange={(e) => setState(e.target.value)}
        {...restProps}
        type={type}
        variant="outlined"
      />
    </Box>
  );
};

export default Field;
