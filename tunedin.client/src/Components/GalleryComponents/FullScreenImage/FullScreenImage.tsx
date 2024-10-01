import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FullScreenImage: React.FC<{ src: string; onClose: () => void }> = ({
  src,
  onClose,
}) => (
  <Modal
    open={true}
    onClose={onClose}
    aria-labelledby="fullscreen-image"
    aria-describedby="fullscreen-image-description"
  >
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        height: "90%",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 1,
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box
        component="img"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        alt="Fullscreen image"
        src={src}
      />
    </Box>
  </Modal>
);

export default FullScreenImage;