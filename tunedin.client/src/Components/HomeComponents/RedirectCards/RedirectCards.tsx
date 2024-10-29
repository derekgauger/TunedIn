import React from "react";
import { RedirectCardData } from "../../../Utils/types";
import RedirectCard from "./RedirectCard";
import { Grid } from "@mui/material";

interface RedirectCardsProps {
  sections: RedirectCardData[];
}

const RedirectCards: React.FC<RedirectCardsProps> = ({ sections }) => {
  return (
    <Grid container spacing={4} className="mb-16">
      {sections.map((section, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          key={index}
          sx={{ display: "flex" }} // This ensures Grid items have matching heights
        >
          <div
            style={{ width: "100%" }} // Ensure motion div takes full width
          >
            <RedirectCard section={section} />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default RedirectCards;
