import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
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

const ContactInfo: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    minWidth: theme.spacing(4),
    color: theme.palette.primary.main,
  }));

  return (
    <Paper elevation={1} sx={{ p: 2, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Contact Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <StyledListItemIcon>
                <PhoneIcon />
              </StyledListItemIcon>
              <ListItemText primary="Phone" secondary="+1 (123) 456-7890" />
            </ListItem>
            <ListItem>
              <StyledListItemIcon>
                <EmailIcon />
              </StyledListItemIcon>
              <ListItemText primary="Email" secondary="contact@example.com" />
            </ListItem>
            <ListItem>
              <StyledListItemIcon>
                <LocationOnIcon />
              </StyledListItemIcon>
              <ListItemText
                primary="Address"
                secondary="123 Main St, City, State 12345"
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Business Hours</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <StyledListItemIcon>
                <AccessTimeIcon />
              </StyledListItemIcon>
              <ListItemText
                primary="Monday - Friday"
                secondary="9:00 AM - 5:00 PM"
              />
            </ListItem>
            <ListItem>
              <StyledListItemIcon>
                <AccessTimeIcon />
              </StyledListItemIcon>
              <ListItemText primary="Saturday" secondary="10:00 AM - 2:00 PM" />
            </ListItem>
            <ListItem>
              <StyledListItemIcon>
                <AccessTimeIcon />
              </StyledListItemIcon>
              <ListItemText primary="Sunday" secondary="Closed" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Social Media</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <StyledListItemIcon>
                <FacebookIcon />
              </StyledListItemIcon>
              <ListItemText primary="Facebook" secondary="/companyname" />
            </ListItem>
            <ListItem>
              <StyledListItemIcon>
                <TwitterIcon />
              </StyledListItemIcon>
              <ListItemText primary="Twitter" secondary="@companyname" />
            </ListItem>
            <ListItem>
              <StyledListItemIcon>
                <InstagramIcon />
              </StyledListItemIcon>
              <ListItemText primary="Instagram" secondary="@companyname" />
            </ListItem>
            <ListItem>
              <StyledListItemIcon>
                <LinkedInIcon />
              </StyledListItemIcon>
              <ListItemText
                primary="LinkedIn"
                secondary="/company/companyname"
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default ContactInfo;