import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { styled } from "@mui/material/styles";
import GenericSectionText from "../GeneralComponents/GenericSectionText";

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: theme.spacing(4),
  color: theme.palette.primary.main,
}));

interface ContactItem {
  icon: React.ReactElement;
  primary: string;
  secondary: string;
}

interface AccordionSection {
  id: string;
  title: string;
  items: ContactItem[];
}

const accordionData: AccordionSection[] = [
  {
    id: "panel1",
    title: "Contact Details",
    items: [
      {
        icon: <PhoneIcon />,
        primary: "Phone",
        secondary: "+1 (123) 456-7890",
      },
      {
        icon: <EmailIcon />,
        primary: "Email",
        secondary: "contact@example.com",
      },
      {
        icon: <LocationOnIcon />,
        primary: "Address",
        secondary: "123 Main St, City, State 12345",
      },
    ],
  },
  {
    id: "panel2",
    title: "Business Hours",
    items: [
      {
        icon: <AccessTimeIcon />,
        primary: "Monday - Friday",
        secondary: "9:00 AM - 5:00 PM",
      },
      {
        icon: <AccessTimeIcon />,
        primary: "Saturday",
        secondary: "10:00 AM - 2:00 PM",
      },
      {
        icon: <AccessTimeIcon />,
        primary: "Sunday",
        secondary: "Closed",
      },
    ],
  },
  {
    id: "panel3",
    title: "Social Media",
    items: [
      {
        icon: <FacebookIcon />,
        primary: "Facebook",
        secondary: "/companyname",
      },
      {
        icon: <TwitterIcon />,
        primary: "Twitter",
        secondary: "@companyname",
      },
      {
        icon: <InstagramIcon />,
        primary: "Instagram",
        secondary: "@companyname",
      },
      {
        icon: <LinkedInIcon />,
        primary: "LinkedIn",
        secondary: "/company/companyname",
      },
    ],
  },
];

const ContactInfo: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Paper elevation={1} sx={{ p: 2, height: "100%" }}>
      <GenericSectionText text="Contact Information" type="Header" />
      {accordionData.map((section) => (
        <Accordion
          key={section.id}
          expanded={
            expanded === section.id ||
            (section.id === "panel1" && expanded === "")
          }
          onChange={handleChange(section.id)}
          sx={{ mt: section.id === "panel1" ? 2 : 0 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <GenericSectionText text={section.title} type="AccordionHeader" />
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {section.items.map((item, index) => (
                <ListItem key={index}>
                  <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                  <ListItemText
                    primary={
                      <GenericSectionText
                        text={item.primary}
                        type="AccordionBulletHeader"
                      />
                    }
                    secondary={
                      <GenericSectionText
                        text={item.secondary}
                        type="AccordionBulletDescription"
                      />
                    }
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
};

export default ContactInfo;
