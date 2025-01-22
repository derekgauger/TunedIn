import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  CircularProgress,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import DownloadIcon from "@mui/icons-material/Download";
import { FileData } from "../../Utils/types";
import { useUser } from "../../Hooks/useUser";
import GenericSectionText from "../GeneralComponents/GenericSectionText";

interface FileCardProps {
  file: FileData;
  handlePreviewOpen: (file: FileData) => void;
  getMiniPreview: any;
  handleDownload: any;
  handleDelete: any;
  loading: boolean;
}

const FileCard: React.FC<FileCardProps> = ({
  file,
  handlePreviewOpen,
  getMiniPreview,
  handleDownload,
  handleDelete,
  loading,
}) => {
  const { user } = useUser();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: 6,
        },
        backgroundColor: "secondary.light",
        p: 2,
        position: "relative", // Added for loading overlay positioning
      }}
    >
      {/* Loading overlay for individual card */}
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
            borderRadius: "inherit",
          }}
        >
          <CircularProgress size={24} />
        </Box>
      )}
      <Box
        sx={{
          position: "relative",
          height: 200,
          cursor: "pointer",
          "&:hover .preview-overlay": {
            opacity: 1,
          },
        }}
        onClick={() => handlePreviewOpen(file)}
      >
        {getMiniPreview(file)}
        <Box
          className="preview-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            opacity: 0,
            transition: "opacity 0.3s",
          }}
        >
          <FullscreenIcon sx={{ color: "white", fontSize: 40 }} />
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <GenericSectionText text={file.fileName} type="Header" />
        <GenericSectionText
          text={`Size: ${(file.fileSize / 1024 / 1024).toFixed(2)} MB`}
          type="Description"
        />
        <GenericSectionText
          text={`Uploaded: ${new Date(file.uploadDate).toLocaleDateString()}`}
          type="Description"
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          size="small"
          startIcon={<DownloadIcon />}
          onClick={(e) => {
            e.stopPropagation();
            handleDownload(file.id, file.fileName);
          }}
          disabled={loading}
        >
          Download
        </Button>
        {user?.isAdmin && (
          <IconButton
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(file.id);
            }}
            disabled={loading}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default FileCard;
