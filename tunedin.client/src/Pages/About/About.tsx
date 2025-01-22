import React from "react";
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Business, People, EmojiObjects, History } from "@mui/icons-material";
import ContainerPaper from "../../Components/GeneralComponents/ContainerPaper/ContainerPaper";
import PageHeader from "../../Components/GeneralComponents/PageHeader/PageHeader";
import { AboutListItemData, AboutSectionData } from "../../Utils/types";
import CompanyInfo from "../../Components/AboutComponents/CompanyInfo";
import FounderInfo from "../../Components/AboutComponents/FounderInfo";
import GenericSectionText from "../../Components/GeneralComponents/GenericSectionText";
import { DARK } from "../../Utils/colors";

const mission: AboutSectionData = {
  title: "My Mission",
  content:
    "My goal is to provide all types of athletes with a safe and effective workout program. Each program is carefully developed around the inidivudal and aims to promote athletic performance, prevent injury, and increase longivity in the sport.",
  listItems: [
    {
      icon: <Business />,
      primary: "Years of Experience",
      secondary: "Strong background in many sports from Crossfit to XC mountain biking",
    },
    {
      icon: <People />,
      primary: "Professionally Certified",
      secondary: "Through both the NSCA and NASM, I am certified as a Personal Trainer / Sports Nutritionist",
    },
    {
      icon: <EmojiObjects />,
      primary: "Flexible to Changes",
      secondary: "I'm able to make any changes to your program if you have time constraints or injuries",
    },
  ],
};

const roots: AboutSectionData = {
  title: "The Roots",
  content:
    "I started Tuned In Athlete Development with the primary goal of sharing everything I've learned over the years about general fitness and performance athletics. Over the last few years, I've seen an increase in misguided fitness advise that can be both harmful and counterintuitive toward your goals. With my experience in the industry, I've seen just how easy it is to fall victum to poor fitness and diet advice. Tuned In was created out of the idea that it is more important to really focus on training techniques and structure that actually work long term.",
  // listItems: [
  //   { icon: <History />, primary: "2010", secondary: "Company founded" },
  //   {
  //     icon: <History />,
  //     primary: "2015",
  //     secondary: "Expanded to international markets",
  //   },
  //   {
  //     icon: <History />,
  //     primary: "2020",
  //     secondary: "Launched revolutionary product line",
  //   },
  // ],
};

const About: React.FC = () => {
  const renderListItems = (items: AboutListItemData[]) => (
    <List>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemIcon sx={{ color: "primary.main" }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={
              <GenericSectionText
                text={item.primary}
                type={"BulletHeader"}
              ></GenericSectionText>
            }
            secondary={
              <GenericSectionText
                text={item.secondary}
                type={"BulletDescription"}
              ></GenericSectionText>
            }
          />
        </ListItem>
      ))}
    </List>
  );

  const renderSection = (section: AboutSectionData) => (
    <Grid item xs={12} key={section.title}>
      <Paper
        elevation={3}
        sx={{ p: 4, backgroundColor: DARK ? "secondary.light" : "white" }}
      >
        <GenericSectionText
          text={section.title}
          type={"Header"}
        ></GenericSectionText>
        <GenericSectionText
          text={section.content}
          type={"Description"}
        ></GenericSectionText>
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
          <FounderInfo renderListItems={renderListItems} />
        </Grid>
      </Grid>
    </ContainerPaper>
  );
};

export default About;
