import React, { useEffect } from "react";
import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface FullScreenImageProps {
  src: string;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  totalImages: number;
  currentIndex: number;
}

const FullScreenImage: React.FC<FullScreenImageProps> = ({
  src,
  onClose,
  onNavigate,
  totalImages,
  currentIndex,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          onNavigate("prev");
          break;
        case "ArrowRight":
          onNavigate("next");
          break;
        case "Escape":
          onClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNavigate, onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="fullscreen-image"
      aria-describedby="fullscreen-image-description"
    >
      <Box
        onClick={handleBackdropClick}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "12px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              transform: "scale(1.1)",
            },
            transition: "all 0.2s ease-in-out",
            zIndex: 1,
          }}
        >
          <CloseIcon sx={{ fontSize: 32 }} />
        </IconButton>

        <IconButton
          aria-label="previous image"
          onClick={() => onNavigate("prev")}
          sx={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Box
          component="img"
          sx={{
            maxWidth: "90%",
            maxHeight: "90%",
            objectFit: "contain",
          }}
          alt={`Image ${currentIndex + 1} of ${totalImages}`}
          src={src}
        />

        <IconButton
          aria-label="next image"
          onClick={() => onNavigate("next")}
          sx={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default FullScreenImage;
