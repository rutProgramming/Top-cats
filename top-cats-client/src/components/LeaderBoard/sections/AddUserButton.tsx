import React from "react";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function AddUserButton({ onOpen }: { onOpen: () => void }) {
  return (
    <Box textAlign="center">
      <Button
        variant="contained"
        color="success"
        startIcon={<Add />}
        onClick={onOpen}
        sx={{ fontWeight: 800, px: 4, py: 1.25 }}
      >
        הוסף משתמש חדש
      </Button>
    </Box>
  );
}
