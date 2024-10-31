import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useTheme,
  ImageList,
  ImageListItem,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { handleNavigation } from "../../Utils/functions";

const HomeGallerySection: React.FC = () => {
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const galleryImages = [
    "https://picsum.photos/600/600?random=1",
    "https://picsum.photos/600/600?random=2",
    "https://picsum.photos/600/600?random=3",
    "https://picsum.photos/600/600?random=4",
    "https://picsum.photos/600/600?random=5",
    "https://picsum.photos/600/600?random=6",
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "500px",
        width: "100%",
        // backgroundColor: theme.palette.secondary.main,
        py: 6,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "transparent",
          // background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        },
      }}
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              mb: 4,
              fontVariant: "small-caps",
              color: theme.palette.primary.main,
              fontWeight: "bold",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100px",
                height: "4px",
                backgroundColor: theme.palette.primary.main,
                zIndex: 2,
              },
            }}
          >
            Gallery
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={10}>
              <ImageList
                variant="quilted"
                cols={isMobile ? 1 : isMedium ? 2 : 3}
                gap={16}
                sx={{
                  overflow: "hidden",
                  boxShadow: 3,
                }}
              >
                {galleryImages.map((img, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "keyframes", stiffness: 300 }}
                  >
                    <ImageListItem
                      cols={index === 0 ? 2 : 1}
                      rows={index === 0 ? 2 : 1}
                    >
                      <img
                        src={img}
                        alt={`Gallery image ${index + 1}`}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </ImageListItem>
                  </motion.div>
                ))}
              </ImageList>
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button
                  component={Button}
                  onClick={() => handleNavigation("/gallery")}
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: 3,
                    },
                    transition: "all 0.3s ease",
                  }}
                  size="large"
                >
                  View Full Gallery
                </Button>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HomeGallerySection;
