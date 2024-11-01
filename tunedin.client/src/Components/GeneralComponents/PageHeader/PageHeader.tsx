import React from "react";
import { Container, Divider } from "@mui/material";
import CustomTypography from "../../CustomUI/CustomTypography";
import { DARK } from "../../../Utils/colors";

interface PageHeaderProps {
  title: string;
  subText?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subText }) => {
  return (
    <Container sx={{ mb: 2 }}>
      <CustomTypography
        size="4xl"
        bold
        color={DARK ? "white" : "primary.main"}
        className="text-center mb-4"
        fontSizeOverrides={{
          xs: "3xl",
          sm: "3xl",
          md: "4xl",
          lg: "4xl",
          xl: "4xl",
          "2xl": "5xl",
        }}
        style={{
          fontVariant: "small-caps",
        }}
      >
        {title}
      </CustomTypography>
      <Divider
        sx={{
          mb: 4,
          height: 2,
          backgroundColor: DARK ? "primary.main" : "#E0E0E0",
        }}
      />
      {subText && (
        <CustomTypography
          size="lg"
          color={DARK ? "#E0E0E0" : "gray"}
          className="text-center"
          fontSizeOverrides={{ xs: "md", sm: "md", xl: "xl", "2xl": "2xl" }}
        >
          {subText}
        </CustomTypography>
      )}
    </Container>
  );
};

export default PageHeader;
