import React from "react";
import { Paper, Typography } from "@mui/material";

export default function Header() {
  return (
    <Paper
      elevation={8}
      sx={{
        background: "linear-gradient(45deg, #7e57c2, #4527a0)",
        borderRadius: 4,
        p: 3,
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" fontWeight={800}>🏆 Top Cats! 🏆</Typography>
    </Paper>
  );
}
