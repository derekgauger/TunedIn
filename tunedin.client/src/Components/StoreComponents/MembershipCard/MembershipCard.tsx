import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { CheckIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../../Utils/functions";
import { Membership } from "../../../Utils/types";
import CustomTypography from "../../CustomUI/CustomTypography";

interface MembershipCardProps {
  option: Membership;
  isCurrent?: boolean;
}

const MembershipCard: React.FC<MembershipCardProps> = ({
  option,
  isCurrent,
}) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string | undefined) => {
    navigate(path ? path : "/", { state: { additionalData: option } });
    scrollToTop();
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderTop: `4px solid ${option.color}`,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={option.image}
        alt={`${option.title} image`}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <CustomTypography
          bold
          size={"xl"}
          fontSizeOverrides={{
            xs: "xl",
            sm: "xl",
            md: "xl",
            lg: "xl",
            xl: "xl",
            "2xl": "2xl",
          }}
          color={option.color}
        >
          {option.title}
        </CustomTypography>
        <CustomTypography
          size={"md"}
          fontSizeOverrides={{
            xs: "md",
            sm: "md",
            md: "md",
            lg: "md",
            xl: "md",
            "2xl": "lg",
          }}
          color="text.secondary"
        >
          {option.price}
        </CustomTypography>
        <List>
          {option.features.map((feature, index) => (
            <ListItem key={index} disablePadding>
              <ListItemIcon sx={{ color: "primary.main" }}>
                <CheckIcon className={`text-[${option.color}]`} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <CustomTypography
                    size={"md"}
                    fontSizeOverrides={{
                      xs: "md",
                      sm: "md",
                      md: "md",
                      lg: "md",
                      xl: "md",
                      "2xl": "lg",
                    }}
                    color="text.secondary"
                  >
                    {feature}
                  </CustomTypography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      {!isCurrent && (
        <CardActions>
          <Button
            onClick={() =>
              handleNavigation(
                `/services/${option.title.replace(" ", "-").toLowerCase()}`
              )
            }
            size="large"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: option.color,
              "&:hover": { bgcolor: option.color },
            }}
          >
            Choose Plan
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default MembershipCard;
