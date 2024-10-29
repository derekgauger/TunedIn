import React from "react";
import CustomTypography from "../CustomUI/CustomTypography";

type TextType =
  | "Header"
  | "Description"
  | "BulletHeader"
  | "BulletDescription"
  | "AccordionHeader"
  | "AccordionBulletHeader"
  | "AccordionBulletDescription"
  | "FooterHeader"
  | "FooterDescription";

interface GenericSectionTextProps {
  text?: string;
  type: TextType;
  alignment?: "center" | "left" | "right";
  colorOverride?: string;
  className?: string;
  children?: React.ReactNode;
}

const GenericSectionText: React.FC<GenericSectionTextProps> = ({
  text,
  type,
  alignment,
  colorOverride,
  children,
  className,
}) => {
  let alignmentClass = "";
  if (!alignment) {
    alignmentClass = "text-left";
  } else if (alignment === "center") {
    alignmentClass = "text-center";
  } else if (alignment === "right") {
    alignmentClass = "text-right";
  }

  return (
    <div>
      {type === "Header" && (
        <CustomTypography
          size="lg"
          semiBold
          fontSizeOverrides={{ xs: "md", sm: "md" }}
          className={`${alignmentClass} ${className ? className : ""}`}
          color={colorOverride}
          style={{
            fontVariant: "small-caps",
          }}
        >
          {text || children}
        </CustomTypography>
      )}
      {type === "Description" && (
        <CustomTypography
          size="sm"
          color={colorOverride || "text.secondary"}
          className={`${alignmentClass} ${className ? className : ""}`}
          fontSizeOverrides={{ xs: "sm", sm: "sm" }}
        >
          {text || children}
        </CustomTypography>
      )}
      {type === "BulletHeader" && (
        <CustomTypography
          size={"md"}
          semiBold
          className={`${alignmentClass} ${className ? className : ""}`}
          color={colorOverride}
          style={{
            fontVariant: "small-caps",
          }}
        >
          {text || children}
        </CustomTypography>
      )}
      {type === "BulletDescription" && (
        <CustomTypography
          size={"sm"}
          color={colorOverride || "text.secondary"}
          className={`${alignmentClass} ${className ? className : ""}`}
        >
          {text || children}
        </CustomTypography>
      )}
      {type === "AccordionHeader" && (
        <CustomTypography
          size="md"
          semiBold
          fontSizeOverrides={{ xs: "sm", sm: "sm" }}
          className={`${alignmentClass} ${className ? className : ""}`}
          color={colorOverride}
          style={{
            fontVariant: "small-caps",
          }}
        >
          {text || children}
        </CustomTypography>
      )}
      {type === "AccordionBulletHeader" && (
        <CustomTypography
          size={"sm"}
          className={`${alignmentClass} ${className ? className : ""}`}
          color={colorOverride}
        >
          {text || children}
        </CustomTypography>
      )}
      {type === "AccordionBulletDescription" && (
        <CustomTypography
          size={"sm"}
          color={colorOverride || "text.secondary"}
          className={`${alignmentClass} ${className ? className : ""}`}
        >
          {text || children}
        </CustomTypography>
      )}
      {type === "FooterHeader" && (
        <CustomTypography
          size="lg"
          semiBold
          fontSizeOverrides={{ xs: "md", sm: "md" }}
          className={`${alignmentClass} ${className ? className : ""}`}
          color={colorOverride}
          style={{
            fontVariant: "small-caps",
          }}
        >
          {text || children}
        </CustomTypography>
      )}
      {type === "FooterDescription" && (
        <CustomTypography
          size="sm"
          color={colorOverride || "text.secondary"}
          className={`${alignmentClass} ${className ? className : ""}`}
          fontSizeOverrides={{ xs: "sm", sm: "sm" }}
        >
          {text || children}
        </CustomTypography>
      )}
    </div>
  );
};

export default GenericSectionText;
