import { Box } from "@mui/material";
import LandingScreen from "../../Components/HomeComponents/LandingScreen/LandingScreen";
import HomeAboutSection from "./HomeAboutSection";
import HomeGallerySection from "./HomeGallerySection";
import HomeServicesSection from "./HomeServicesSection";
import HomeContactSection from "./HomeContactSection";

const Home = () => {
  return (
    <Box overflow={"hidden"}>
      <LandingScreen />

      {/* About Section */}
      <HomeAboutSection />

      {/* Gallery Section */}
      <HomeGallerySection />

      {/* Services Section */}
      <HomeServicesSection />

      {/* Contact Section */}
      <HomeContactSection />
    </Box>
  );
};

export default Home;
