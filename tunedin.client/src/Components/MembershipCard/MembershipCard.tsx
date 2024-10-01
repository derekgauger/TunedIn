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
import { Membership } from "../../Utils/types";
import { useNavigate } from "react-router-dom";

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          sx={{ color: option.color, fontWeight: "bold" }}
        >
          {option.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          {option.price}
        </Typography>
        <List>
          {option.features.map((feature, index) => (
            <ListItem key={index} disablePadding>
              <ListItemIcon sx={{ color: "primary.main" }}>
                <CheckIcon className={`text-[${option.color}]`} />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      {!isCurrent && (
        <CardActions>
          <Button
          onClick={() => handleNavigation(`/shop/${option.title.replace(" ", '-').toLowerCase()}`)}
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
