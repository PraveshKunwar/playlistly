import React from "react";
import { Avatar, Box, Typography } from "@mui/joy";
import { TopItems as TopItem } from "../interfaces/TopItems";

interface TopItemsProps {
  items: TopItem[];
}

const TopItems: React.FC<TopItemsProps> = ({ items }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1rem", // Reduce the gap for closer items
        padding: "2rem 1rem",
        backgroundColor: "#121212", // Optional for styling
      }}
    >
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100px", // Adjust width to fit more items
            textAlign: "center",
            "@media (max-width: 768px)": {
              width: "70px", // Adjust width for smaller screens
            },
          }}
        >
          <Avatar
            src={item.images && item.images[0]?.url}
            alt={item.name}
            sx={{
              width: "96px",
              height: "96px",
              marginBottom: "0.5rem",
              "@media (max-width: 768px)": {
                width: "60px",
                height: "60px",
              },
            }}
          />
          <Typography
            level="body-lg"
            sx={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              lineHeight: "1.2",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
              color: "white",
              "@media (max-width: 768px)": {
                fontSize: "0.8rem",
              },
            }}
          >
            {item.name}
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              fontSize: "0.7rem",
              fontWeight: "bold",
              lineHeight: "1.2",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
              color: "white",
              "@media (max-width: 768px)": {
                fontSize: "0.8rem",
              },
            }}
          >
            Popularity: {item.popularity}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TopItems;
