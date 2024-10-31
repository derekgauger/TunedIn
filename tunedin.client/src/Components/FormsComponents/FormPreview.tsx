import React from "react";
import { FileData } from "../../Utils/types";
import { Box, Typography } from "@mui/material";

interface FormPreviewProps {
  selectedFile: FileData | null;
  previewUrl: string | null;
}

const FormPreview: React.FC<FormPreviewProps> = ({
  selectedFile,
  previewUrl,
}) => {
  if (!selectedFile || !previewUrl) return null;

  const contentType = selectedFile.contentType.toLowerCase();

  if (contentType.includes("pdf")) {
    return (
      <Box sx={{ width: "100%", height: "calc(100vh - 200px)" }}>
        <iframe
          src={previewUrl}
          style={{ width: "100%", height: "100%", border: "none" }}
          title={`Preview of ${selectedFile.fileName}`}
        />
      </Box>
    );
  }

  if (contentType.includes("image")) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 200px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <img
          src={previewUrl}
          alt={`Preview of ${selectedFile.fileName}`}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
    );
  }

  if (
    contentType.includes("text") ||
    contentType.includes("json") ||
    contentType.includes("xml")
  ) {
    return (
      <Box sx={{ width: "100%", height: "calc(100vh - 200px)" }}>
        <iframe
          src={previewUrl}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            backgroundColor: "white",
          }}
          title={`Preview of ${selectedFile.fileName}`}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 200px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h6" color="text.secondary">
        Preview not available for this file type
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Please download the file to view its contents
      </Typography>
    </Box>
  );
};

export default FormPreview;
