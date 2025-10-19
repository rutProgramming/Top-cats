import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import type { NewUser } from "../types";

export default function AddUserDialog({
  open, onClose, value, onChange, onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  value: NewUser;
  onChange: (v: NewUser) => void;
  onSubmit: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>הוסף משתמש חדש</DialogTitle>
      <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
        <Close />
      </IconButton>
      <DialogContent dividers>
        <TextField
          label="שם" fullWidth margin="normal"
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
        />
        <TextField
          label="תמונת URL" fullWidth margin="normal"
          value={value.image_url}
          onChange={(e) => onChange({ ...value, image_url: e.target.value })}
        />
        <TextField
          label="ניקוד התחלתי" type="number" fullWidth margin="normal"
          value={value.score}
          onChange={(e) => onChange({ ...value, score: Number(e.target.value) })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button variant="contained" onClick={onSubmit}>הוסף</Button>
      </DialogActions>
    </Dialog>
  );
}
