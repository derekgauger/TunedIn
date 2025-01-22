import { Avatar, Box, Divider, Grid, Paper } from "@mui/material";
import React from "react";
import { AboutFounderData, AboutListItemData } from "../../Utils/types";
// import { EmojiObjects, Person, Work } from "@mui/icons-material";
import GenericSectionText from "../GeneralComponents/GenericSectionText";
import { DARK } from "../../Utils/colors";

interface FounderInfoData {
    renderListItems: (items: AboutListItemData[]) => JSX.Element;
}

const founderInfo: AboutFounderData = {
    name: "Randy Gauger",
    description:
        "Currently, my training goals are centered around motocross and mountain biking. Previously, I have participated in many types of races and different areas of fitness. I've been fortunate enough to gain a lot of experience when it comes to different sports.",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQFvIlL-Hudb2A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729696487641?e=1735776000&v=beta&t=TJxHm6fKkkE6MISWUHZNaMn0-tlpCdvba17FToDmxMc",
    // journey: [
    //   {
    //     icon: <Work />,
    //     primary: "Part-time Gorilla",
    //     secondary: "Developed patented technologies",
    //   },
    //   {
    //     icon: <Person />,
    //     primary: "Full-time Beard Grower",
    //     secondary: "Guides aspiring entrepreneurs",
    //   },
    //   {
    //     icon: <EmojiObjects />,
    //     primary: "Thot Leader",
    //     secondary: "Regular speaker at industry conferences",
    //   },
    // ],
};

const FounderInfo: React.FC<FounderInfoData> = ({ renderListItems }) => {
    return (
        <Paper
            elevation={3}
            sx={{ p: 4, backgroundColor: DARK ? "secondary.light" : "white" }}
        >
            <GenericSectionText text="Meet The Founder" type="Header" />
            <Grid container spacing={2} mt={0}>
                <Grid item xs={12} md={4}>
                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            sx={{
                                width: "100%",
                                height: "auto",
                                maxWidth: "300px",
                                aspectRatio: "1 / 1",
                                borderRadius: 0,
                            }}
                            alt="Founder"
                            src={founderInfo.image}
                            variant="square"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <GenericSectionText
                        text={founderInfo.name}
                        type="Header"
                        alignment="left"
                    />
                    <GenericSectionText
                        text={founderInfo.description}
                        type="Description"
                        alignment="left"
                    />
                    {founderInfo.journey && (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <GenericSectionText
                                text="Professional Journey"
                                type="Header"
                            />
                            {renderListItems(founderInfo.journey)}
                        </>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FounderInfo;
