import { Avatar, Box, Divider, Grid, Paper } from "@mui/material";
import React from "react";
import { AboutFounderData, AboutListItemData } from "../../Utils/types";
import { EmojiObjects, Person, Work } from "@mui/icons-material";
import GenericSectionText from "../GeneralComponents/GenericSectionText";

interface FounderInfoData {
  renderListItems: (items: AboutListItemData[]) => JSX.Element;
}

const founderInfo: AboutFounderData = {
  name: "Jane Doe",
  description:
    "Jane Doe is a visionary entrepreneur with over 20 years of experience in the tech industry. Her passion for innovation and problem-solving led her to found our company with the mission of revolutionizing the way businesses operate in the digital age.",
  image: "https://picsum.photos/150",
  journey: [
    {
      icon: <Work />,
      primary: "Tech Innovator",
      secondary: "Developed patented technologies",
    },
    {
      icon: <Person />,
      primary: "Mentor",
      secondary: "Guides aspiring entrepreneurs",
    },
    {
      icon: <EmojiObjects />,
      primary: "Thought Leader",
      secondary: "Regular speaker at industry conferences",
    },
  ],
};

const FounderInfo: React.FC<FounderInfoData> = ({ renderListItems }) => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <GenericSectionText text="Meet Our Founder" type="Header" />
      <Grid container spacing={2} mt={0}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: "100%",
                height: "auto",
                maxWidth: "300px",
                aspectRatio: "1 / 1",
                borderRadius: 0,
              }}
              alt="Founder"
              src={founderInfo.image}
              variant="square"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <GenericSectionText
            text={founderInfo.name}
            type="Header"
            alignment="left"
          />
          <GenericSectionText
            text={founderInfo.description}
            type="Description"
            alignment="left"
          />
          <Divider sx={{ my: 2 }} />
          <GenericSectionText text="Professional Journey" type="Header" />
          {renderListItems(founderInfo.journey)}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FounderInfo;
