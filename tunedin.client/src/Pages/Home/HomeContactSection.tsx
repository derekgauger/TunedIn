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

const HomeContactSection: React.FC = () => {
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
        width: "100%",
        backgroundColor: theme.palette.primary.main,
        py: 6,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
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
                  component={Button}
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
  );
};

export default HomeContactSection;
