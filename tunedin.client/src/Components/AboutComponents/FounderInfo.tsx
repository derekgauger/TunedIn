import { Avatar, Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { AboutFounderData, AboutListItemData } from "../../Utils/types";
import { EmojiObjects, Person, Work } from "@mui/icons-material";

interface FounderInfoData {
  renderListItems : (items: AboutListItemData[]) => JSX.Element;
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
      <Typography variant="h5" component="h2" gutterBottom>
        Meet Our Founder
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                width: '100%',
                height: 'auto',
                maxWidth: '300px',
                aspectRatio: '1 / 1',
                borderRadius: 0,
              }}
              alt="Founder"
              src={founderInfo.image}
              variant="square"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" component="h3" gutterBottom>
            {founderInfo.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {founderInfo.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" component="h4" gutterBottom>
            Professional Journey
          </Typography>
          {renderListItems(founderInfo.journey)}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FounderInfo;
