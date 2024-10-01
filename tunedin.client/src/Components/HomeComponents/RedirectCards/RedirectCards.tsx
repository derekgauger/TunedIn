import React from "react";
import { RedirectCardData } from "../../../Utils/types";
import RedirectCard from "./RedirectCard";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";

interface RedirectCardsProps {
  sections: RedirectCardData[];
}

const RedirectCards: React.FC<RedirectCardsProps> = ({ sections }) => {
  return (
    <Grid container spacing={4} className="mb-16">
      {sections.map((section, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .5, delay: index * 0.2 }}
          >
            <RedirectCard section={section} />
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default RedirectCards;