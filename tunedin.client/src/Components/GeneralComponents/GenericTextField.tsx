import React from "react";
import {
  TextField,
  useTheme,
  useMediaQuery,
  TextFieldProps,
} from "@mui/material";

interface ResponsiveTextFieldProps extends Omit<TextFieldProps, "size"> {
  mobileFontSize?: string;
  desktopFontSize?: string;
  isDark?: boolean;
}

const GenericTextField: React.FC<ResponsiveTextFieldProps> = ({
  mobileFontSize = "0.875rem",
  desktopFontSize = "1rem",
  isDark = false,
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TextField
      {...props}
      fullWidth
      size={isMobile ? "small" : "medium"}
      sx={{
        "& .MuiInputBase-root": {
          fontSize: {
            xs: mobileFontSize,
            sm: desktopFontSize,
          },
          backgroundColor: isDark
            ? theme.palette.secondary.light
            : theme.palette.common.white,
          "& fieldset": {
            borderColor: isDark ? theme.palette.common.white : undefined,
          },
          color: isDark ? theme.palette.common.white : undefined,
        },
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: isDark ? theme.palette.common.white : undefined,
          },
          "&.Mui-focused fieldset": {
            borderColor: isDark ? theme.palette.primary.main : undefined,
          },
        },
        "& .MuiInputBase-input": {
          color: isDark ? theme.palette.common.white : undefined,
          "&::placeholder": {
            color: isDark ? theme.palette.common.white : undefined,
            opacity: isDark ? 0.7 : undefined,
          },
        },
        "& .MuiInputLabel-root": {
          color: isDark ? theme.palette.common.white : undefined,
          "&.Mui-focused": {
            color: isDark ? theme.palette.primary.main : undefined,
          },
        },
        ...props.sx,
      }}
    />
  );
};

export default GenericTextField;