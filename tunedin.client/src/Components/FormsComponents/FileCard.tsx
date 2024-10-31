import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import DownloadIcon from "@mui/icons-material/Download";
import { FileData } from "../../Utils/types";
import { useUser } from "../../Hooks/useUser";

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
      }}
    >
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
        <Typography variant="h6" component="h2" gutterBottom>
          {file.fileName}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Size: {(file.fileSize / 1024 / 1024).toFixed(2)} MB
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
        </Typography>
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
