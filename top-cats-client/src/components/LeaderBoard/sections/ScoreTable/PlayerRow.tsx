import React, { ReactNode } from "react";
import Grid from "@mui/material/Grid";

export default function PlayerRow({
  left,
  middle,
  right,
  actions,
  rowProps,
}: {
  left: ReactNode;
  middle: ReactNode;
  right: ReactNode;
  actions: ReactNode;
  rowProps?: { shaded?: boolean };
}) {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{
        py: 1.25,
        borderRadius: 2,
        bgcolor: rowProps?.shaded ? "rgba(255,255,255,0.06)" : "transparent",
      }}
    >
      <Grid size={2}>{left}</Grid>
      <Grid size={5}>{middle}</Grid>
      <Grid size={2}>{right}</Grid>
      <Grid size={3}>{actions}</Grid>
    </Grid>
  );
}
