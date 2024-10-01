import { Box, Container, Grid } from "@mui/material";
import {
  FitnessCenter,
  PhotoLibrary,
  Info,
  ContactMail,
} from "@mui/icons-material";
import LandingScreen from "../../Components/HomeComponents/LandingScreen/LandingScreen";
import InfoCard from "../../Components/HomeComponents/InfoCard/InfoCard";
import { RedirectCardData } from "../../Utils/types";
import RedirectCards from "../../Components/HomeComponents/RedirectCards/RedirectCards";
import { motion } from "framer-motion";

const Home = () => {
  const sections: RedirectCardData[] = [
    {
      title: "About Us",
      icon: Info,
      description: "Learn about our mission and values",
      link: "/about",
      buttonText: "Discover More",
      backgroundImage: "https://picsum.photos/400/300?random=1",
    },
    {
      title: "Gallery",
      icon: PhotoLibrary,
      description: "See our facilities and members in action",
      link: "/gallery",
      buttonText: "View Gallery",
      backgroundImage: "https://picsum.photos/400/300?random=2",
    },
    {
      title: "Our Services",
      icon: FitnessCenter,
      description: "Explore our fitness programs",
      link: "/services",
      buttonText: "See Services",
      backgroundImage: "https://picsum.photos/400/300?random=3",
    },
    {
      title: "Contact",
      icon: ContactMail,
      description: "Get in touch with us",
      link: "/contact",
      buttonText: "Contact Us",
      backgroundImage: "https://picsum.photos/400/300?random=4",
    },
  ];

  const infoCards = [
    {
      title: "State-of-the-Art Facilities",
      description:
        "Our modern gym is equipped with the latest fitness technology to help you reach your goals faster.",
      image: "https://picsum.photos/600/300?random=5",
      alt: "Fitness Training",
    },
    {
      title: "Expert Trainers",
      description:
        "Our certified personal trainers are dedicated to helping you achieve your fitness aspirations.",
      image: "https://picsum.photos/600/300?random=6",
      alt: "Fitness Training",
    },
  ];

  return (
    <Box>
      {/* Full-height LandingScreen */}
      <Box sx={{ height: "100vh", position: "relative" }}>
        <LandingScreen />
      </Box>

      {/* Additional content starts here */}
      <Box className="">
        <Container maxWidth="xl" className="py-16">
          <RedirectCards sections={sections} />

          <Grid container spacing={6} sx={{ mt: 1 }}>
            {infoCards.map((card, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <InfoCard
                    title={card.title}
                    description={card.description}
                    image={card.image}
                    alt={card.alt}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
