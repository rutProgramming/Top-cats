import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function TableHeader() {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(4px)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        px: 2,
        py: 1.5,
      }}
    >
      <Grid container spacing={2}>
        <Grid size={2}>
          <Typography color="white" fontWeight={800}>מיקום</Typography>
        </Grid>
        <Grid size={5}>
          <Typography color="white" fontWeight={800}>שחקן</Typography>
        </Grid>
        <Grid size={2}>
          <Typography color="white" fontWeight={800} align="center">ניקוד</Typography>
        </Grid>
        <Grid size={3}>
          <Typography color="white" fontWeight={800} align="center">פעולות</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
