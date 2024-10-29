import React from 'react';
import { TextField, useTheme, useMediaQuery, TextFieldProps } from '@mui/material';

interface ResponsiveTextFieldProps extends Omit<TextFieldProps, 'size'> {
  mobileFontSize?: string;
  desktopFontSize?: string;
}

const GenericTextField: React.FC<ResponsiveTextFieldProps> = ({
  mobileFontSize = '0.875rem',
  desktopFontSize = '1rem',
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TextField
      {...props}
      fullWidth
      size={isMobile ? 'small' : 'medium'}
      sx={{
        '& .MuiInputBase-root': {
          fontSize: {
            xs: mobileFontSize,
            sm: desktopFontSize,
          }
        },
        ...props.sx
      }}
    />
  );
};

export default GenericTextField;