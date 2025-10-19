import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, IconButton, Typography, Stack, Chip, Paper, Avatar, Divider,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import type { Player } from "../types";

export default function AroundDialog({
  open, onClose, above, user, below,
}: {
  open: boolean;
  onClose: () => void;
  above: Player[];
  user: Player | null;
  below: Player[];
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>שחקנים סביב המשתמש</DialogTitle>
      <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
        <Close />
      </IconButton>
      <DialogContent dividers>
        <Section label="מעל" count={above.length}>
          <ListOrEmpty players={above} />
        </Section>

        {user && (
          <>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 800 }}>המשתמש</Typography>
            <PlayerLine player={{ ...user, isCurrentUser: true }} highlight />
            <Divider sx={{ my: 2 }} />
          </>
        )}

        <Section label="מתחת" count={below.length}>
          <ListOrEmpty players={below} />
        </Section>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>סגור</Button>
      </DialogActions>
    </Dialog>
  );
}

function Section({ label, count, children }: React.PropsWithChildren<{ label: string; count: number }>) {
  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>{label}</Typography>
        <Chip size="small" label={count} />
      </Stack>
      {children}
    </>
  );
}

function ListOrEmpty({ players }: { players: Player[] }) {
  if (!players.length) {
    return <Typography variant="body2" sx={{ opacity: 0.6, mb: 2 }}>— אין נתונים —</Typography>;
  }
  return (
    <Stack spacing={1.25} sx={{ mb: 2 }}>
      {players.map((p) => <PlayerLine key={p.id} player={p} />)}
    </Stack>
  );
}

function PlayerLine({ player, highlight = false }: { player: Player; highlight?: boolean }) {
  return (
    <Paper
      variant={highlight ? "elevation" : "outlined"}
      elevation={highlight ? 3 : 0}
      sx={{
        p: 1.25,
        borderRadius: 2,
        borderColor: highlight ? "success.main" : "divider",
        bgcolor: highlight ? "success.light" : "background.paper",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ minWidth: 0 }}>
          <Avatar src={player.image_url || "https://via.placeholder.com/40"} />
          <Typography noWrap sx={{ fontWeight: 600 }}>
            {player.name}
          </Typography>
        </Stack>
        <Chip label={`💎 ${player.score ?? 0}`} color={highlight ? "success" : "primary"} />
      </Stack>
    </Paper>
  );
}
