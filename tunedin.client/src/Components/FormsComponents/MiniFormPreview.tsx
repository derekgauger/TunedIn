import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { FileData } from "../../Utils/types";

interface MiniFormPreviewProps {
  miniPreviews: FilePreview[];
  file: FileData;
}

const MiniFormPreview: React.FC<MiniFormPreviewProps> = ({
  miniPreviews,
  file,
}) => {
  const preview = miniPreviews.find((p) => p.id === file.id);
  const contentType = file.contentType.toLowerCase();

  if (!preview) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (contentType.includes("pdf")) {
    return (
      <object
        data={preview.url}
        type="application/pdf"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          PDF Preview
        </Typography>
      </object>
    );
  }

  if (contentType.includes("image")) {
    return (
      <img
        src={preview.url}
        alt={`Preview of ${file.fileName}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    );
  }

  if (
    contentType.includes("text") ||
    contentType.includes("json") ||
    contentType.includes("xml")
  ) {
    return (
      <iframe
        src={preview.url}
        title={`Preview of ${file.fileName}`}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          backgroundColor: "white",
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        No preview available
      </Typography>
    </Box>
  );
};

export default MiniFormPreview;
