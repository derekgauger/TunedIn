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
import InstagramIcon from "@mui/icons-material/Instagram";
import { styled } from "@mui/material/styles";
import GenericSectionText from "../GeneralComponents/GenericSectionText";
import { DARK } from "../../Utils/colors";
import { YouTube } from "@mui/icons-material";

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
                secondary: "262-581-7793",
            },
            {
                icon: <EmailIcon />,
                primary: "Email",
                secondary: "tunedinad@gmail.com",
            },
            {
                icon: <LocationOnIcon />,
                primary: "Location",
                secondary: "Elkhorn, WI 53121",
            },
        ],
    },
    // {
    //   id: "panel2",
    //   title: "Business Hours",
    //   items: [
    //     {
    //       icon: <AccessTimeIcon />,
    //       primary: "Monday - Sunday",
    //       secondary: "9:00 AM - 5:00 PM",
    //     },
    //     {
    //       icon: <AccessTimeIcon />,
    //       primary: "Saturday",
    //       secondary: "10:00 AM - 2:00 PM",
    //     },
    //     {
    //       icon: <AccessTimeIcon />,
    //       primary: "Sunday",
    //       secondary: "Closed",
    //     },
    //   ],
    // },
    {
        id: "panel3",
        title: "Social Media",
        items: [
            // {
            //   icon: <FacebookIcon />,
            //   primary: "Facebook",
            //   secondary: "/companyname",
            // },
            // {
            //   icon: <TwitterIcon />,
            //   primary: "Twitter",
            //   secondary: "@companyname",
            // },
            {
                icon: <InstagramIcon />,
                primary: "Instagram",
                secondary: "@randy_tunedin",
            },
            {
                icon: <YouTube />,
                primary: "YouTube",
                secondary: "@TunedInAthleteDevelopment",
            },
        ],
    },
];

const ContactInfo: React.FC = () => {
    const [expanded, setExpanded] = useState<string | false>("");

    const handleChange =
        (panel: string) =>
        (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Paper
            elevation={1}
            sx={{
                p: 2,
                height: "100%",
                bgcolor: DARK ? "secondary.light" : "white",
            }}
        >
            <GenericSectionText text="Contact Information" type="Header" />
            {accordionData.map((section) => (
                <Accordion
                    key={section.id}
                    expanded={
                        expanded === section.id ||
                        (section.id === "panel1" && expanded === "")
                    }
                    onChange={handleChange(section.id)}
                    sx={{
                        mt: section.id === "panel1" ? 2 : 0,
                        bgcolor: DARK ? "secondary.light" : "#fafafa",
                        border: "1px solid white",
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    >
                        <GenericSectionText
                            text={section.title}
                            type="AccordionHeader"
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {section.items.map((item, index) => (
                                <ListItem key={index}>
                                    <StyledListItemIcon>
                                        {item.icon}
                                    </StyledListItemIcon>
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
