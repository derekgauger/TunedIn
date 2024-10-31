import React from "react";
import { TypographyProps, useTheme } from "@mui/material";
import { PaletteColor, Theme } from "@mui/material/styles";
import clsx from "clsx";

type FontSize = (typeof FontSizes)[number];

const FontSizes = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
  "9xl",
] as const;

type ScreenSize = (typeof ScreenSizes)[number];

const ScreenSizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

interface CustomTypographyProps extends Omit<TypographyProps, "variant"> {
  size: FontSize;
  bold?: boolean;
  semiBold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string | keyof Theme["palette"];
  className?: string;
  fontSizeOverrides?: Partial<Record<ScreenSize, FontSize>>;
}

const CustomTypography: React.FC<CustomTypographyProps> = ({
  size,
  bold,
  semiBold,
  italic,
  underline,
  color,
  className,
  fontSizeOverrides,
  children,
  ...props
}) => {
  const makeFontSizeClasses = (size: FontSize) => {
    const classes: string[] = [];
    const defaultSizeIndex = FontSizes.indexOf(size);
    const LARGE_SCREEN_SIZE_OFFSET = 3;
    ScreenSizes.forEach((screenSize, index) => {
      const currentFontIndex =
        defaultSizeIndex - LARGE_SCREEN_SIZE_OFFSET + index;
      let currentSize = FontSizes[currentFontIndex];
      if (fontSizeOverrides && fontSizeOverrides[screenSize]) {
        currentSize = fontSizeOverrides[screenSize];
      }
      if (!currentSize) {
        currentSize = FontSizes[0];
      }
      if (index === 0) {
        classes.push(`text-${currentSize}`);
      }
      classes.push(`${screenSize}:text-${currentSize}`);
    });
    return classes.join(" ");
  };

  const theme = useTheme();

  const getColor = () => {
    if (!color) return undefined;
    if (color.startsWith("#")) return color;
    try {
      const colorParts = color.split(".");
      if (colorParts.length === 2) {
        const [paletteColor, shade] = colorParts;
        return (
          theme.palette[
            paletteColor as keyof typeof theme.palette
          ] as PaletteColor
        )[shade as keyof PaletteColor];
      }
      const paletteColor = theme.palette[color as keyof typeof theme.palette];
      return (paletteColor as PaletteColor)?.main || color;
    } catch (error) {
      console.error(`Error accessing color ${color} in theme palette:`, error);
      return color;
    }
  };

  return (
    <div
      className={clsx(
        makeFontSizeClasses(size),
        {
          "font-bold": bold,
          "font-semibold": semiBold,
          italic: italic,
          underline: underline,
        },
        className
      )}
      style={{
        ...props.style,
        color: getColor(),
      }}
    >
      {children}
    </div>
  );
};

export default CustomTypography;
