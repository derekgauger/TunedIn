import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  ImageList,
  ImageListItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LandingScreen from "../../Components/HomeComponents/LandingScreen/LandingScreen";
import { scrollToTop } from "../../Utils/functions";
import { motion } from "framer-motion";

const Home = () => {
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const galleryImages = [
    "https://picsum.photos/600/600?random=1",
    "https://picsum.photos/600/600?random=2",
    "https://picsum.photos/600/600?random=3",
    "https://picsum.photos/600/600?random=4",
    "https://picsum.photos/600/600?random=5",
    "https://picsum.photos/600/600?random=6",
  ];

  const handleNavigation = (path: string) => {
    scrollToTop();
    navigate(path);
  };

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
    <Box overflow={"hidden"}>
      <LandingScreen />

      {/* About Section */}
      <Box
        sx={{
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          backgroundColor: theme.palette.secondary.light,
          py: 6,
          position: "relative",
          overflow: "visible",
          "&::before": {
            content: '""',
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            top: "-150px",
            right: "-150px",
            animation: "float 6s ease-in-out infinite",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
            bottom: "-100px",
            left: "-100px",
            animation: "float 8s ease-in-out infinite reverse",
            zIndex: 1,
          },
          "@keyframes float": {
            "0%, 100%": {
              transform: "translateY(0) rotate(0deg)",
            },
            "50%": {
              transform: "translateY(-20px) rotate(10deg)",
            },
          },
        }}
      >
        <Container maxWidth="xl" sx={{ zIndex: 2 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div variants={fadeInUp}>
                  <Box
                    component="img"
                    src="https://picsum.photos/600/400?random=7"
                    alt="About Us"
                    sx={{
                      width: "100%",
                      height: "auto",
                      boxShadow: 3,
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  />
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                      fontVariant: "small-caps",
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-10px",
                        left: "0",
                        width: "60px",
                        height: "4px",
                        backgroundColor: theme.palette.primary.main,
                        transform: "scaleX(0)",
                        animation: "expandWidth 0.6s ease-out forwards",
                      },
                      "@keyframes expandWidth": {
                        to: {
                          transform: "scaleX(1)",
                        },
                      },
                    }}
                  >
                    Our Story
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    color="primary.contrastText"
                    sx={{ mt: 3 }}
                  >
                    Discover our journey to becoming the premier fitness
                    destination. Our commitment to excellence and passion for
                    health has driven us since day one.
                  </Typography>
                  <Button
                    component={Link}
                    onClick={() => handleNavigation("/about")}
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(90deg, transparent, ${theme.palette.primary.light}33, transparent)`,
                        animation: "shimmer 2s infinite",
                      },
                      "@keyframes shimmer": {
                        "100%": {
                          left: "100%",
                        },
                      },
                    }}
                  >
                    Learn More About Us
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Gallery Section */}
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
                    component={Link}
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

      {/* Services Section */}
      <Box
        sx={{
          minHeight: "500px",
          width: "100%",
          backgroundColor: theme.palette.secondary.dark,
          py: 6,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            width: "400px",
            height: "400px",
            background: `linear-gradient(45deg, ${theme.palette.primary.main}11, ${theme.palette.secondary.light}11)`,
            top: "10%",
            right: "5%",
            animation: "morphing 15s ease-in-out infinite",
          },
          // },
        }}
      >
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <Grid
              container
              spacing={4}
              alignItems="center"
              direction={isMedium ? "column-reverse" : "row"}
            >
              <Grid item xs={12} md={6}>
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                      fontVariant: "small-caps",
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                    }}
                  >
                    The Services We Offer
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    color="primary.contrastText"
                    sx={{ mb: 3 }}
                  >
                    Transform Your Life with Our Premium Fitness Solutions
                  </Typography>
                  <Box
                    component={motion.div}
                    variants={fadeInUp}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    {[
                      "Personal Training Sessions",
                      "Group Fitness Classes",
                      "Nutrition Consulting",
                      "Specialized Programs",
                    ].map((service, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "primary.contrastText",
                          "&::before": {
                            content: '""',
                            display: "inline-block",
                            width: "8px",
                            height: "8px",
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: "50%",
                            marginRight: 2,
                            transform: "scale(0)",
                            animation: "popIn 0.3s ease-out forwards",
                            animationDelay: `${index * 0.2}s`,
                          },
                          "@keyframes popIn": {
                            to: {
                              transform: "scale(1)",
                            },
                          },
                        }}
                      >
                        {service}
                      </Box>
                    ))}
                  </Box>
                  <Button
                    component={Link}
                    onClick={() => handleNavigation("/services")}
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      mt: 4,
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        "&::before": {
                          transform: "translateX(100%)",
                        },
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(90deg, transparent, ${theme.palette.primary.light}33, transparent)`,
                        transition: "transform 0.6s ease",
                      },
                    }}
                  >
                    Explore Our Services
                  </Button>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: -20,
                        right: -20,
                        width: "100%",
                        height: "100%",
                        border: "4px solid",
                        borderColor: "primary.main",
                        zIndex: 1,
                        transition: "transform 0.3s ease",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src="https://picsum.photos/600/400?random=8"
                      alt="Our Services"
                      sx={{
                        width: "100%",
                        height: "auto",
                        boxShadow: 3,
                        position: "relative",
                        zIndex: 1,
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        sx={{
          minHeight: "500px",
          width: "100%",
          backgroundColor: theme.palette.primary.main,
          py: 6,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://picsum.photos/1920/1080?random=9)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50px",
            background: `linear-gradient(45deg, ${theme.palette.secondary.main} 25%, transparent 25%) -50px 0,
                        linear-gradient(-45deg, ${theme.palette.secondary.main} 25%, transparent 25%) -50px 0`,
            backgroundSize: "100px 100px",
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} textAlign="center">
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                      fontVariant: "small-caps",
                      color: "primary.main",
                      fontWeight: "bold",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    Ready to Start Your Journey?
                  </Typography>
                  <Typography
                    variant="h6"
                    paragraph
                    sx={{
                      color: "white",
                      mb: 4,
                      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    Join our community and transform your life today
                  </Typography>
                  <Button
                    component={Link}
                    onClick={() => handleNavigation("/contact")}
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{
                      py: 2,
                      px: 6,
                      border: "2px solid white",
                      fontSize: "1.2rem",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                        transform: "translateY(-3px)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                      },
                      transition: "all 0.3s ease",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: "-50%",
                        left: "-50%",
                        width: "200%",
                        height: "200%",
                        background: `radial-gradient(circle, ${theme.palette.secondary.light}33 10%, transparent 70%)`,
                        transform: "rotate(45deg)",
                        animation: "ripple 2s linear infinite",
                      },
                      "@keyframes ripple": {
                        to: {
                          transform: "rotate(405deg)",
                        },
                      },
                    }}
                  >
                    Contact Us Now
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
