import React, { useEffect, useState } from "react";
import {
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
import { Membership } from "../../Utils/types";
import { getMembership } from "../../Functions/memberships";
import { enqueueSnackbar } from "notistack";
import LoadingIcon from "../../Components/GeneralComponents/LoadingIcon/LoadingIcon";
import { useUser } from "../../Hooks/useUser";
import { handleNavigation } from "../../Utils/functions";
import { DARK } from "../../Utils/colors";

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: DARK ? theme.palette.secondary.light : "white",
}));

const PlanImage = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
});

const PlanDetails: React.FC = () => {
  const [plan, setPlan] = useState<Membership | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const splitPath = location.pathname.split("/");
      const currentPlanNameFromURL = splitPath[splitPath.length - 1];
      const currentPlanName = currentPlanNameFromURL.replace("-", " ");
      const currentPlan = await getMembership(currentPlanName);
      if (currentPlan) {
        setPlan(currentPlan.data);
      } else {
        enqueueSnackbar(
          "Failed to get membership details. Please try again later.",
          {
            variant: "error",
          }
        );
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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

  const handleSignUp = () => {
    if (user) {
      console.log("Sign up button clicked");
    } else {
      enqueueSnackbar(
        "Please sign in or register an account to sign up for a plan",
        {
          variant: "info",
        }
      );
      handleNavigation("/sign-in");
    }
  };

  if (loading) {
    return <LoadingIcon />;
  }

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
                {plan?.title}
              </CustomTypography>
              <CustomTypography
                size={"md"}
                fontSizeOverrides={{
                  xs: "md",
                  sm: "md",
                  md: "md",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "xl",
                }}
                color={DARK ? "white" : "#E0E0E0"}
                style={{ marginBottom: "1rem" }}
              >
                {plan?.price}
              </CustomTypography>
              <GenericSectionText text={plan?.description} type="Description" />
              <Button
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                sx={{ mt: "auto" }}
                onClick={handleSignUp}
              >
                Sign Up Now
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <PlanImage src={plan?.image} alt={plan?.title} />
          </Grid>
        </Grid>
      </SectionPaper>

      <SectionPaper elevation={3}>
        <GenericSectionText text="What's Included" type="Header" />
        <Grid container spacing={2}>
          {plan?.features.map((feature, index) => (
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
            <GenericSectionText text={plan?.testimonial} type="Description" />
            <GenericSectionText
              text={`-${plan?.testimonialAuthor}`}
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
