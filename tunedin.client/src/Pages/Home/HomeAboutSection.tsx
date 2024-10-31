import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { handleNavigation } from "../../Utils/functions";

const HomeAboutSection: React.FC = () => {
  const theme = useTheme();

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
                  component={Button}
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
  );
};

export default HomeAboutSection;
