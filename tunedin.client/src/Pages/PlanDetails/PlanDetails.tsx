import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  styled,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ContainerPaper from "../../Components/GeneralComponents/ContainerPaper/ContainerPaper";
import { useLocation } from "react-router-dom";
import GenericSectionText from "../../Components/GeneralComponents/GenericSectionText";
import CustomTypography from "../../Components/CustomUI/CustomTypography";

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const PlanImage = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
}));

export type Membership = {
  title: string;
  price: string;
  features: string[];
  color: string;
  image: string;
  description: string;
};

const PlanDetails: React.FC = () => {
  const location = useLocation();
  const [plan, setPlan] = useState<Membership>({
    ...location.state?.additionalData,
    description:
      "Experience the ultimate fitness journey with our comprehensive plan. Designed to meet your unique needs, this plan combines expert guidance, state-of-the-art facilities, and a supportive community to help you achieve your fitness goals.",
  });

  const testimonial = {
    text: "This fitness plan has completely transformed my life! I've never felt stronger or more confident. The trainers are exceptional and the community is so supportive.",
    author: "Sarah J., Member since 2023",
  };

  const qualifications = [
    {
      text: "Certified personal trainers with 5+ years of experience",
      icon: <FitnessCenterIcon />,
    },
    {
      text: "State-of-the-art equipment and facilities",
      icon: <EmojiEventsIcon />,
    },
    {
      text: "Customized nutrition plans developed by registered dietitians",
      icon: <RestaurantIcon />,
    },
    {
      text: "24/7 access to online resources and support",
      icon: <AccessTimeIcon />,
    },
  ];

  return (
    <ContainerPaper>
      <SectionPaper elevation={3}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <CustomTypography
                bold
                size={"3xl"}
                fontSizeOverrides={{
                  xs: "2xl",
                  sm: "2xl",
                  md: "2xl",
                  lg: "3xl",
                  xl: "3xl",
                  "2xl": "4xl",
                }}
                color={"primary.main"}
                style={{
                  fontVariant: "small-caps",
                }}
              >
                {plan.title}
              </CustomTypography>
              <CustomTypography
                size={"lg"}
                fontSizeOverrides={{
                  xs: "lg",
                  sm: "lg",
                  md: "lg",
                  lg: "xl",
                  xl: "xl",
                  "2xl": "2xl",
                }}
                color="black"
                style={{ marginBottom: "1rem" }}
              >
                {plan.price}
              </CustomTypography>
              <GenericSectionText text={plan.description} type="Description" />
              <Button
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                sx={{ mt: "auto" }}
              >
                Sign Up Now
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <PlanImage src={plan.image} alt={plan.title} />
          </Grid>
        </Grid>
      </SectionPaper>

      <SectionPaper elevation={3}>
        <GenericSectionText text="What's Included" type="Header" />
        <Grid container spacing={2}>
          {plan.features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <GenericSectionText
                      text={feature}
                      type={"BulletDescription"}
                    ></GenericSectionText>
                  }
                />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </SectionPaper>

      <SectionPaper elevation={3}>
        <GenericSectionText text="Our Qualifications" type="Header" />
        <List>
          {qualifications.map((qualification, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {React.cloneElement(qualification.icon, { color: "primary" })}
              </ListItemIcon>
              <ListItemText
                primary={
                  <GenericSectionText
                    text={qualification.text}
                    type={"BulletDescription"}
                  ></GenericSectionText>
                }
              />
            </ListItem>
          ))}
        </List>
      </SectionPaper>

      <SectionPaper elevation={3}>
        <GenericSectionText text="Member Testimonial" type="Header" />
        <Grid container spacing={2}>
          <Grid item>
            <FormatQuoteIcon fontSize="large" color="primary" />
          </Grid>
          <Grid item xs>
            <GenericSectionText text={testimonial.text} type="Description" />
            <GenericSectionText
              text={`-${testimonial.author}`}
              type="BulletHeader"
              className="mt-2"
            />
          </Grid>
        </Grid>
      </SectionPaper>
    </ContainerPaper>
  );
};

export default PlanDetails;
