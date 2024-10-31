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
  useTheme,
} from "@mui/material";
import { CheckIcon } from "lucide-react";
import { handleNavigation } from "../../../Utils/functions";
import { Membership } from "../../../Utils/types";
import CustomTypography from "../../CustomUI/CustomTypography";
import { DARK } from "../../../Utils/colors";

interface MembershipCardProps {
  option: Membership | undefined;
  isCurrent?: boolean;
  isOnModal?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const MembershipCard: React.FC<MembershipCardProps> = ({
  option,
  isCurrent,
  isOnModal,
  isSelected,
  onClick,
}) => {
  const theme = useTheme();

  return (
    <Card
      onClick={onClick}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: DARK
          ? !isCurrent || isOnModal
            ? "secondary.light"
            : "secondary.main"
          : "white",
        boxShadow: 3,
        p: 2,
        cursor: isOnModal && !isCurrent ? "pointer" : undefined,
        transition: isOnModal && !isCurrent ? "transform 0.2s" : "none",
        "&:hover": {
          transform: isOnModal && !isCurrent ? "scale(1.02)" : "none",
        },
        borderRadius: isSelected ? 1 : 0,
        border: isSelected ? `2px solid ${theme.palette.primary.main}` : "none",
      }}
    >
      {!isCurrent && (
        <CardMedia
          component="img"
          height="200"
          image={option?.image}
          alt={`${option?.title} image`}
        />
      )}
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
          color="white"
        >
          {option?.title}
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
          color="#E0E0E0"
        >
          {option?.price}
        </CustomTypography>
        <List>
          {option?.features.map((feature, index) => (
            <ListItem key={index} disablePadding>
              <ListItemIcon sx={{ color: "primary.main" }}>
                <CheckIcon />
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
                    color="#E0E0E0"
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
                `/services/${option?.title.replace(" ", "-").toLowerCase()}`
              )
            }
            size="large"
            fullWidth
            variant="contained"
            color="primary"
          >
            View Membership Information
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default MembershipCard;
