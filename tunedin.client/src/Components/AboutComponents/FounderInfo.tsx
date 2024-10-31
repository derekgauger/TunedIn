import { Avatar, Box, Divider, Grid, Paper } from "@mui/material";
import React from "react";
import { AboutFounderData, AboutListItemData } from "../../Utils/types";
import { EmojiObjects, Person, Work } from "@mui/icons-material";
import GenericSectionText from "../GeneralComponents/GenericSectionText";
import { DARK } from "../../Utils/colors";

interface FounderInfoData {
  renderListItems: (items: AboutListItemData[]) => JSX.Element;
}

const founderInfo: AboutFounderData = {
  name: "Randy Gauger",
  description:
    "Fitness maniac, tech enthusiast, and serial entrepreneur. Randy is the driving force behind TunedIn, bringing a wealth of experience and a passion for innovation to the table. His vision has guided the company from its humble beginnings to its current position as a leader in the industry. When he's not busy revolutionizing the world of fitness tech, you can find Randy hitting the gym, exploring the great outdoors, or spending time with his family.",
  image:
    "https://media.licdn.com/dms/image/v2/D4D03AQFvIlL-Hudb2A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729696487641?e=1735776000&v=beta&t=TJxHm6fKkkE6MISWUHZNaMn0-tlpCdvba17FToDmxMc",
  journey: [
    {
      icon: <Work />,
      primary: "Part-time Gorilla",
      secondary: "Developed patented technologies",
    },
    {
      icon: <Person />,
      primary: "Full-time Beard Grower",
      secondary: "Guides aspiring entrepreneurs",
    },
    {
      icon: <EmojiObjects />,
      primary: "Thot Leader",
      secondary: "Regular speaker at industry conferences",
    },
  ],
};

const FounderInfo: React.FC<FounderInfoData> = ({ renderListItems }) => {
  return (
    <Paper elevation={3} sx={{ p: 4, backgroundColor: DARK ? "secondary.light" : "white" }}>
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
