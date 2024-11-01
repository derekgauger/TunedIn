import React, { useState, useEffect } from "react";
import { Box, Tab, Tabs, Grid, Card, CardMedia } from "@mui/material";
import ReactPlayer from "react-player";
import ContainerPaper from "../../Components/GeneralComponents/ContainerPaper/ContainerPaper";
import PageHeader from "../../Components/GeneralComponents/PageHeader/PageHeader";
import FullScreenImage from "../../Components/GalleryComponents/FullScreenImage/FullScreenImage";
import LoadingIcon from "../../Components/GeneralComponents/LoadingIcon/LoadingIcon";
import { DARK } from "../../Utils/colors";

const Gallery: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseFullscreen = () => {
    setSelectedImageIndex(null);
  };

  const handleNavigateImage = (direction: "prev" | "next") => {
    if (selectedImageIndex === null) return;

    if (direction === "next") {
      setSelectedImageIndex((prev) =>
        prev === images.length - 1 ? 0 : (prev ?? 0) + 1
      );
    } else {
      setSelectedImageIndex((prev) =>
        prev === 0 ? images.length - 1 : (prev ?? 0) - 1
      );
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const images = [
    "https://picsum.photos/id/1018/1000/600/",
    "https://picsum.photos/id/1015/1000/600/",
    "https://picsum.photos/id/1019/1000/600/",
    "https://picsum.photos/id/1016/1000/600/",
    "https://picsum.photos/id/1020/1000/600/",
    "https://picsum.photos/id/1024/1000/600/",
    "https://picsum.photos/id/1025/1000/600/",
    "https://picsum.photos/id/1026/1000/600/",
    "https://picsum.photos/id/1027/1000/600/",
    "https://picsum.photos/id/1028/1000/600/",
    "https://picsum.photos/id/1029/1000/600/",
    "https://picsum.photos/id/1031/1000/600/",
  ];

  const videos = [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://vimeo.com/1084537",
    "https://www.youtube.com/watch?v=_OBlgSz8sSM",
  ];

  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <ContainerPaper>
      <PageHeader title="Gallery" />
      <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 4 }}>
        <Tab label="Images" sx={{ color: DARK ? "white" : "black" }} />
        <Tab label="Videos" sx={{ color: DARK ? "white" : "black" }} />
      </Tabs>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  overflow: "hidden",
                  boxShadow: 3,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                  cursor: "pointer",
                }}
                onClick={() => handleImageClick(index)}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={image}
                  alt={`Gallery image ${index + 1}`}
                  sx={{ objectFit: "cover" }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          {videos.map((url, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  aspectRatio: "16/9",
                  overflow: "hidden",
                  boxShadow: 3,
                }}
              >
                <ReactPlayer url={url} width="100%" height="100%" controls />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {selectedImageIndex !== null && (
        <FullScreenImage
          src={images[selectedImageIndex]}
          onClose={handleCloseFullscreen}
          onNavigate={handleNavigateImage}
          totalImages={images.length}
          currentIndex={selectedImageIndex}
        />
      )}
    </ContainerPaper>
  );
};

export default Gallery;
