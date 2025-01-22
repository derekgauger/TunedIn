import { Box, Container, Grid, Typography, Button, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { handleNavigation } from "../../Utils/functions";

const HomeServicesSection: React.FC = () => {
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));

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
                  Available Services
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  color="primary.contrastText"
                  sx={{ mb: 3 }}
                >
                  Every program includes the following:
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
                    "100% Personalized Workouts",
                    "Nutrition Consulting",
                    "Exercise Technique Analysis",
                    "Goal Setting",
                    "Unlimited Contact Via Phone Call or Text",
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
                  component={Button}
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
  );
};

export default HomeServicesSection;
