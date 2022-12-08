import { Input } from "@mui/material";

type Props = {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  error?: boolean;
};

const FormInput = (props: Props) => {
  const {
    name,
    value,
    onChange,
    type = "text",
    placeholder,
    error,
    ...rest
  } = props;
  return (
    <Input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      error={error}
      {...rest}
    />
  );
};

export default FormInput;
