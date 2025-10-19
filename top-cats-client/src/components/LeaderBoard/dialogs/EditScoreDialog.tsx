import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import type { EditUser } from "../types";

export default function EditScoreDialog({
  open, onClose, value, onChange, onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  value: EditUser;
  onChange: (v: EditUser) => void;
  onSubmit: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>עדכן ניקוד</DialogTitle>
      <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
        <Close />
      </IconButton>
      <DialogContent dividers>
        <TextField
          label="ניקוד חדש" type="number" fullWidth margin="normal"
          value={value.score}
          onChange={(e) => onChange({ ...value, score: Number(e.target.value) })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button variant="contained" onClick={onSubmit}>עדכן</Button>
      </DialogActions>
    </Dialog>
  );
}
