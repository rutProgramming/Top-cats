import React from "react";
import { Box, Chip, Paper, Stack, Tooltip, IconButton, Divider, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Edit, Visibility, EmojiEvents } from "@mui/icons-material";
import TableHeader from "./TableHeader";
import PlayerRow from "./PlayerRow";
import type { Player } from "../../types";

export default function ScoreTable({
  players,
  onEdit,
  onAround,
}: {
  players: Player[];
  onEdit: (id: string, score: number) => void;
  onAround: (id: string) => void;
}) {
  const trophyColor = (pos: number) => (pos === 1 ? "#FFD700" : pos === 2 ? "#C0C0C0" : pos === 3 ? "#CD7F32" : "#B39DDB");

  return (
    <Paper
      elevation={10}
      sx={{
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      <TableHeader />

      <Box sx={{ flex: 1, overflow: "auto", px: 2, py: 1 }}>
        {players.map((p, idx) => (
          <Box key={p.id ?? idx}>
            <PlayerRow
              left={
                <Stack direction="row" spacing={1} alignItems="center">
                  <EmojiEvents sx={{ color: trophyColor(idx + 1) }} />
                  <span style={{ color: "white", fontWeight: 800, fontSize: 18 }}>{idx + 1}</span>
                </Stack>
              }
              middle={
                <Stack direction="row" spacing={1.5} alignItems="center" style={{ minWidth: 0 }}>
                  <Avatar src={p.image_url || "https://via.placeholder.com/48"} alt={p.name} />
                  <span
                    style={{
                      color: "white",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.name}
                  </span>
                </Stack>
              }
              right={
                <Box textAlign="center">
                  <Chip label={p.score ?? 0} color="info" sx={{ fontWeight: 800 }} />
                </Box>
              }
              actions={
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Tooltip title="עדכן ניקוד">
                    <IconButton
                      color="warning"
                      size="small"
                      sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
                      onClick={() => onEdit(p.id, p.score ?? 0)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="ראה סביבו">
                    <IconButton
                      color="info"
                      size="small"
                      sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
                      onClick={() => onAround(p.id)}
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
              rowProps={{
                shaded: idx % 2 === 0,
              }}
            />
            <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
