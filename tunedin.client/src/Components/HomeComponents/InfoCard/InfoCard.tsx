import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface InfoCardsProps {
  title: string;
  description: string;
  image: string;
  alt: string;
}

const InfoCard: React.FC<InfoCardsProps> = ({
  title,
  description,
  image,
  alt,
}) => {
  return (
    <Card>
      <CardMedia component="img" height="300" image={image} alt={alt} />
      <CardContent>
        <Typography variant="h5" component="h3" className="mb-2">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
