import { Typography } from "@mui/material";

const ErrorMessage: React.FC<{ error?: string | undefined | boolean }> = ({ error }) => (
  <Typography
    variant="caption"
    color="error"
    sx={{
      minHeight: "1.5em",
      display: "block",
      visibility: error ? "visible" : "hidden",
    }}
  >
    {error || " "}
  </Typography>
);

export default ErrorMessage;