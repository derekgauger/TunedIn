/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
    Box,
    Tab,
    Tabs,
    Grid,
    Card,
    CardMedia,
    Typography,
    Button,
} from "@mui/material";
import ReactPlayer from "react-player";
import ContainerPaper from "../../Components/GeneralComponents/ContainerPaper/ContainerPaper";
import PageHeader from "../../Components/GeneralComponents/PageHeader/PageHeader";
import FullScreenImage from "../../Components/GalleryComponents/FullScreenImage/FullScreenImage";
import LoadingIcon from "../../Components/GeneralComponents/LoadingIcon/LoadingIcon";
import { DARK } from "../../Utils/colors";
import api from "../../Utils/api";
import { useUser } from "../../Hooks/useUser";
import {
    deletePicture,
    getPictures,
    uploadPicture,
} from "../../Functions/pictures";
import { Picture } from "../../Utils/types";
import { enqueueSnackbar } from "notistack";
import GenericSectionText from "../../Components/GeneralComponents/GenericSectionText";

const Gallery: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [pictures, setPictures] = useState<Picture[]>([]);
    const [uploadLoading, setUploadLoading] = useState(false);
    const { user } = useUser();

    const fetchPictures = async () => {
        try {
            setIsLoading(true);
            const response = await getPictures();
            setPictures(response?.data);
        } catch (error) {
            console.error("Error fetching pictures:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPictures();
    }, []);

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
                prev === pictures.length - 1 ? 0 : (prev ?? 0) + 1
            );
        } else {
            setSelectedImageIndex((prev) =>
                prev === 0 ? pictures.length - 1 : (prev ?? 0) - 1
            );
        }
    };

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", file.name);
        formData.append("description", "");

        try {
            setUploadLoading(true);
            await uploadPicture(formData);
            await fetchPictures();
            event.target.value = "";
            enqueueSnackbar("Image uploaded successfully", {
                variant: "success",
            });
        } catch {
            enqueueSnackbar("Failed to upload image", {
                variant: "error",
            });
        } finally {
            setUploadLoading(false);
        }
    };

    const videos: string[] = [];

    if (isLoading || uploadLoading) {
        return <LoadingIcon />;
    }

    const handleDeleteImage = async (id: number) => {
        await deletePicture(id);
        enqueueSnackbar("Image deleted successfully", {
            variant: "success",
        });
        await fetchPictures();
    };

    return (
        <ContainerPaper>
            <PageHeader title="Gallery" />
            {user?.isAdmin && (
                <Box sx={{ mb: 2 }}>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id="image-upload"
                        onChange={handleFileUpload}
                    />
                    <label htmlFor="image-upload">
                        <Button
                            variant="contained"
                            component="span"
                            disabled={uploadLoading}
                            sx={{ mr: 1, width: "100%" }}
                        >
                            {uploadLoading ? "Uploading..." : "Upload Image"}
                        </Button>
                    </label>
                </Box>
            )}

            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
                sx={{ mb: 4 }}
            >
                {(user?.isAdmin || pictures.length !== 0) && (
                    <Tab
                        label="Images"
                        sx={{ color: DARK ? "white" : "black" }}
                    />
                )}
                {(user?.isAdmin || videos.length !== 0) && (
                    <Tab
                        label="Videos"
                        sx={{ color: DARK ? "white" : "black" }}
                    />
                )}
            </Tabs>

            {user?.isAdmin ? (
                <div>
                    {tabValue == 0 && pictures.length === 0 && (
                        <GenericSectionText type="Header" alignment="center">
                            No images found. Upload some images to get started.
                        </GenericSectionText>
                    )}
                    {tabValue == 1 && videos.length === 0 && (
                        <GenericSectionText type="Header" alignment="center">
                            No videos found. Upload some videos to get started.
                        </GenericSectionText>
                    )}
                </div>
            ) : (
                <div>
                    {tabValue == 0 && pictures.length === 0 && (
                        <GenericSectionText type="Header" alignment="center">
                            No images found.
                        </GenericSectionText>
                    )}
                    {tabValue == 1 && videos.length === 0 && (
                        <GenericSectionText type="Header" alignment="center">
                            No videos found.
                        </GenericSectionText>
                    )}
                </div>
            )}

            {tabValue === 0 && (
                <Grid container spacing={3}>
                    {pictures.map((picture, index) => (
                        <Grid item xs={12} sm={6} md={4} key={picture.id}>
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "hidden",
                                    boxShadow: 3,
                                    transition: "transform 0.3s ease-in-out",
                                    "&:hover": { transform: "scale(1.02)" },
                                    cursor: "pointer",
                                    position: "relative",
                                    bgcolor: "secondary.light",
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "relative",
                                        paddingTop: "75%", // 4:3 Aspect Ratio
                                        width: "100%",
                                        bgcolor: "secondary.light",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={`${api.defaults.baseURL}/protectedgallery/thumbnail/${picture.id}`}
                                        alt={
                                            picture.title ||
                                            `Gallery image ${index + 1}`
                                        }
                                        onClick={() => handleImageClick(index)}
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Box>
                                {user?.isAdmin && (
                                    <Box
                                        sx={{
                                            p: 1,
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mt: "auto",
                                            bgcolor: "secondary.light",
                                            color: "white",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                flex: 1,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {picture.title}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteImage(picture.id);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                )}
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
                                <ReactPlayer
                                    url={url}
                                    width="100%"
                                    height="100%"
                                    controls
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}

            {selectedImageIndex !== null && (
                <FullScreenImage
                    src={`${api.defaults.baseURL}/protectedgallery/${pictures[selectedImageIndex]?.id}`}
                    onClose={handleCloseFullscreen}
                    onNavigate={handleNavigateImage}
                    totalImages={pictures.length}
                    currentIndex={selectedImageIndex}
                />
            )}
        </ContainerPaper>
    );
};

export default Gallery;
