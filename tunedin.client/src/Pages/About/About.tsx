import React from "react";
import {
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Business, People, EmojiObjects, History } from "@mui/icons-material";
import ContainerPaper from "../../Components/ContainerPaper/ContainerPaper";
import PageHeader from "../../Components/PageHeader/PageHeader";
import { AboutListItemData, AboutSectionData } from "../../Utils/types";
import CompanyInfo from "../../Components/AboutPageSections/CompanyInfo";
import FounderInfo from "../../Components/AboutPageSections/FounderInfo";

const mission: AboutSectionData = {
  title: "Our Mission",
  content:
    "At our core, we strive to deliver exceptional value through cutting-edge technology and unparalleled customer service. Our goal is to empower businesses and individuals to reach their full potential in the digital age.",
  listItems: [
    {
      icon: <Business />,
      primary: "Industry Expertise",
      secondary: "Years of experience in various sectors",
    },
    {
      icon: <People />,
      primary: "Dedicated Team",
      secondary: "Skilled professionals committed to your success",
    },
    {
      icon: <EmojiObjects />,
      primary: "Innovative Solutions",
      secondary: "Cutting-edge approaches to complex problems",
    },
  ],
};

const roots: AboutSectionData = {
  title: "Our Roots",
  content:
    "Founded in 2010, our company began as a small startup with a big vision. What started as a two-person operation in a garage has grown into a thriving business with a global reach. Our journey has been marked by continuous innovation, unwavering commitment to quality, and a deep understanding of our clients' needs.",
  listItems: [
    { icon: <History />, primary: "2010", secondary: "Company founded" },
    {
      icon: <History />,
      primary: "2015",
      secondary: "Expanded to international markets",
    },
    {
      icon: <History />,
      primary: "2020",
      secondary: "Launched revolutionary product line",
    },
  ],
};

const About: React.FC = () => {
  const renderListItems = (items: AboutListItemData[]) => (
    <List>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemIcon sx={{ color: "primary.main"}}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.primary} secondary={item.secondary} />
        </ListItem>
      ))}
    </List>
  );

  const renderSection = (section: AboutSectionData) => (
    <Grid item xs={12} key={section.title}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {section.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {section.content}
        </Typography>
        {section.listItems && renderListItems(section.listItems)}
      </Paper>
    </Grid>
  );

  return (
    <ContainerPaper>
      <PageHeader title="About Us" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <CompanyInfo />
        </Grid>

        <Grid item xs={12} md={8}>
          {renderSection(mission)}
        </Grid>

        <Grid item xs={12}>
          {renderSection(roots)}
        </Grid>

        <Grid item xs={12}>
          <FounderInfo renderListItems={renderListItems}/>
        </Grid>
      </Grid>
    </ContainerPaper>
  );
};

export default About;
