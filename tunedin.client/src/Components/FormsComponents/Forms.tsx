import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import ContainerPaper from "../GeneralComponents/ContainerPaper/ContainerPaper";
import PageHeader from "../GeneralComponents/PageHeader/PageHeader";
import api from "../../Utils/api";
import GenericSectionText from "../GeneralComponents/GenericSectionText";
import { FileData, FilePreview } from "../../Utils/types";
import { deleteForm, downloadForm, uploadForm } from "../../Functions/forms";
import { enqueueSnackbar } from "notistack";
import LoadingIcon from "../GeneralComponents/LoadingIcon/LoadingIcon";
import FormPreview from "./FormPreview";
import MiniFormPreview from "./MiniFormPreview";
import FileCard from "./FileCard";
import { useUser } from "../../Hooks/useUser";

const Forms: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [miniPreviews, setMiniPreviews] = useState<FilePreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fetchingFiles, setFetchingFiles] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    return () => {
      miniPreviews.forEach((preview) => {
        URL.revokeObjectURL(preview.url);
      });
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [miniPreviews, previewUrl]);

  const fetchFiles = async () => {
    try {
      setFetchingFiles(true);
      const response = await api.get("/form/get-forms");
      setFiles(response.data);
      loadMiniPreviews(response.data);
    } catch {
      enqueueSnackbar("Failed to load files", {
        variant: "error",
      });
    } finally {
      setFetchingFiles(false);
    }
  };

  const loadMiniPreviews = async (files: FileData[]) => {
    const previews: FilePreview[] = [];

    for (const file of files) {
      try {
        const response = await api.get(`/form/download/${file.id}`, {
          responseType: "blob",
        });
        const blob = new Blob([response.data], { type: file.contentType });
        const url = URL.createObjectURL(blob);
        previews.push({ id: file.id, url });
      } catch (error) {
        console.error(`Failed to load preview for file ${file.id}`, error);
      }
    }

    setMiniPreviews(previews);
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await uploadForm(formData);
      enqueueSnackbar("File uploaded successfully", {
        variant: "success",
      });
      await fetchFiles();
    } catch {
      enqueueSnackbar("Failed to upload file", {
        variant: "error",
      });
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDownload = async (fileId: number, fileName: string) => {
    try {
      setLoading(true);
      const response = await downloadForm(fileId);
      const blob = new Blob([response?.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      enqueueSnackbar("Failed to download file", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileId: number) => {
    try {
      setLoading(true);
      await deleteForm(fileId);
      enqueueSnackbar("File deleted successfully", {
        variant: "success",
      });
      await fetchFiles();
    } catch {
      enqueueSnackbar("Failed to delete file", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewOpen = async (file: FileData) => {
    try {
      setLoading(true);
      setSelectedFile(file);
      setPreviewOpen(true);
      const response = await downloadForm(file.id);
      const blob = new Blob([response?.data], { type: file.contentType });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch {
      enqueueSnackbar("Failed to load preview", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewClose = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setPreviewOpen(false);
    setSelectedFile(null);
  };

  const getMiniPreview = (file: FileData) => {
    return <MiniFormPreview miniPreviews={miniPreviews} file={file} />;
  };

  const renderPreview = () => {
    return <FormPreview selectedFile={selectedFile} previewUrl={previewUrl} />;
  };

  if (fetchingFiles) {
    return <LoadingIcon />;
  }

  return (
    <ContainerPaper>
      <PageHeader title="Forms" />
      {user?.isAdmin && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<UploadIcon />}
              disabled={loading}
            >
              Upload File
            </Button>
          </label>
        </Box>
      )}
      {files.length === 0 && (
        <GenericSectionText text="No files found" type="Header" />
      )}
      <Grid container spacing={3}>
        {files.map((file) => (
          <Grid item xs={12} sm={6} md={4} key={file.id}>
            <FileCard
              file={file}
              handleDownload={handleDownload}
              getMiniPreview={getMiniPreview}
              handleDelete={handleDelete}
              handlePreviewOpen={handlePreviewOpen}
              loading={loading}
            />
          </Grid>
        ))}
      </Grid>

      {/* Loading overlay */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Preview Dialog */}
      <Dialog
        fullScreen
        open={previewOpen}
        onClose={handlePreviewClose}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">{selectedFile?.fileName}</Typography>
          <IconButton
            aria-label="close"
            onClick={handlePreviewClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            p: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          {renderPreview()}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "white", p: 2 }}>
          <Button onClick={handlePreviewClose}>Close</Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={() =>
              selectedFile &&
              handleDownload(selectedFile.id, selectedFile.fileName)
            }
            disabled={loading}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </ContainerPaper>
  );
};

export default Forms;
