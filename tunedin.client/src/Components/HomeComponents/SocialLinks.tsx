import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Stack, IconButton, Tooltip } from "@mui/material";
// import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
// import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const SocialLinks = () => {
  const controls = useAnimation();
  const [activeIndex, setActiveIndex] = useState(0);

  const socialLinks = [
    // {
    //   name: "Facebook",
    //   icon: <FacebookIcon sx={{ fontSize: 32 }} />,
    //   url: "https://facebook.com/yourpage",
    // },
    {
      name: "Instagram",
      icon: <InstagramIcon sx={{ fontSize: 32 }} />,
      url: "https://www.instagram.com/randy_tunedin/",
    },
    // {
    //   name: "Twitter",
    //   icon: <TwitterIcon sx={{ fontSize: 32 }} />,
    //   url: "https://twitter.com/yourpage",
    // },
    {
      name: "YouTube",
      icon: <YouTubeIcon sx={{ fontSize: 32 }} />,
      url: "https://www.youtube.com/@TunedInAthleteDevelopment",
    },
  ];

  // Trigger wiggle animation every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % socialLinks.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Trigger animation whenever activeIndex changes
  useEffect(() => {
    controls.start((i) => ({
      rotate:
        i === activeIndex
          ? [0, -15, 15, -15, 15, -15, 15, -10, 10, -5, 5, 0]
          : 0,
      transition: {
        duration: i === activeIndex ? 1.2 : 0,
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
      },
    }));
  }, [activeIndex]);

  return (
    <Stack spacing={3} alignItems="center">
      <Stack
        direction="row"
        spacing={2}
        sx={{
          "& .MuiIconButton-root": {
            color: "white",
            transition: "all 0.3s ease",
            padding: "12px",
            "&:hover": {
              transform: "translateY(-4px)",
              color: "primary.main",
              bgcolor: "rgba(255,255,255,0.15)",
            },
          },
        }}
      >
        {socialLinks.map((social, index) => (
          <motion.div key={social.name} custom={index} animate={controls}>
            <Tooltip title={social.name}>
              <IconButton
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                size="large"
              >
                {social.icon}
              </IconButton>
            </Tooltip>
          </motion.div>
        ))}
      </Stack>
    </Stack>
  );
};

export default SocialLinks;
