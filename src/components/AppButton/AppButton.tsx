import { Button } from "@mui/material";

type Props = {
  onClick: () => void;
  label: string;
  size?: "small" | "medium" | "large";
  variant?: "text" | "outlined" | "contained";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  type?: "button" | "submit" | "reset";
};

const AppButton = (props: Props) => {
  const { onClick, label = "Click", size = "medium", variant = "contained", color = "primary", ...rest } = props;
  return (
    <Button
      onClick={onClick}
      size={size}
      variant={variant}
      color={color}
      {...rest}
    >
      {label}
    </Button>
  );
};

export default AppButton;
