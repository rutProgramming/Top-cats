import React from "react";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { EmojiEvents } from "@mui/icons-material";
import type { Player } from "../types";

function trophyColor(pos: number) {
  if (pos === 1) return "#262623ff";
  if (pos === 3) return "#b8b3adff";
  if (pos === 2) return "#C0C0C0";
  return "#B39DDB";
}

export default function BottomCards({ players }: { players: Player[] }) {
  return (
    <Grid container spacing={2}>
      {players.map((player, idx) => (
        <Grid key={player.id ?? idx} size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={6}
            sx={{
              p: 2,
              textAlign: "center",
              borderRadius: 3,
              background: "linear-gradient(135deg, #8e24aa, #6a1b9a)",
              color: "white",
            }}
          >
            <EmojiEvents sx={{ fontSize: 40, color: trophyColor(idx + 1) }} />
            <Typography variant="h6" fontWeight={700}>
              {player.name}
            </Typography>
            <Typography>💎 {player.score ?? 0}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
