import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  fetchTopPlayers, fetchBottomPlayers, addUser, updateScore, getAround,
} from "./api";
import type { Player, NewUser, EditUser, AroundResponse } from "./types";

import Header from "./sections/Header";
import BottomCards from "./sections/BottomCards";
import AddUserButton from "./sections/AddUserButton";
import ScoreTable from "./sections/ScoreTable/ScoreTable";

import AddUserDialog from "./dialogs/AddUserDialog";
import EditScoreDialog from "./dialogs/EditScoreDialog";
import AroundDialog from "./dialogs/AroundDialog";

export default function LeaderboardContainer() {
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);
  const [bottomPlayers, setBottomPlayers] = useState<Player[]>([]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAround, setOpenAround] = useState(false);

  const [newUser, setNewUser] = useState<NewUser>({ name: "", image_url: "", score: 0 });
  const [editUser, setEditUser] = useState<EditUser>({ id: "", score: 0 });

  const [aroundAbove, setAroundAbove] = useState<Player[]>([]);
  const [aroundUser, setAroundUser] = useState<Player | null>(null);
  const [aroundBelow, setAroundBelow] = useState<Player[]>([]);

  useEffect(() => {
    void loadData();
  }, []);

  async function loadData() {
    const [top, bottom] = await Promise.all([
      fetchTopPlayers(100),
      fetchBottomPlayers(3),
    ]);
    setTopPlayers(top);
    setBottomPlayers(bottom);
  }

  async function onAddUser() {
    await addUser(newUser);
    setOpenAdd(false);
    setNewUser({ name: "", image_url: "", score: 0 });
    await loadData();
  }

  async function onUpdateScore() {
    await updateScore(editUser);
    setOpenEdit(false);
    setEditUser({ id: "", score: 0 });
    await loadData();
  }

  async function onGetAround(userId: string) {
    const raw: AroundResponse = await getAround(userId, 5);

    let above: Player[] = [];
    let user: Player | null = null;
    let below: Player[] = [];

    if (Array.isArray(raw)) {
      const idx = raw.findIndex((p) => p.isCurrentUser);
      if (idx >= 0) {
        above = raw.slice(0, idx);
        user = raw[idx];
        below = raw.slice(idx + 1);
      } else {
        const mid = Math.floor(raw.length / 2);
        above = raw.slice(0, mid);
        user = raw[mid] ?? null;
        below = raw.slice(mid + 1);
      }
    } else if ("around" in raw) {
      const arr = raw.around;
      const idx = arr.findIndex((p) => p.isCurrentUser);
      if (idx >= 0) {
        above = arr.slice(0, idx);
        user = arr[idx];
        below = arr.slice(idx + 1);
      } else {
        const mid = Math.floor(arr.length / 2);
        above = arr.slice(0, mid);
        user = arr[mid] ?? null;
        below = arr.slice(mid + 1);
      }
    } else {
      above = raw.above ?? [];
      user = raw.user ?? null;
      below = raw.below ?? [];
    }

    setAroundAbove(above);
    setAroundUser(user);
    setAroundBelow(below);
    setOpenAround(true);
  }

  return (
    <Box
      sx={{
        minHeight: "100svh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        "&::before": {
          content: '""',
          position: "fixed", inset: 0,
          background: "linear-gradient(135deg, #4a148c, #6a1b9a)",
          zIndex: -1,
        },
        display: "grid",
        gridTemplateRows: "auto auto auto 1fr",
        gap: 8,
        px: { xs: 2, sm: 3 },
        py: 2,
      }}
    >
      <Header />

      <BottomCards players={bottomPlayers} />

      <AddUserButton onOpen={() => setOpenAdd(true)} />

      <ScoreTable
        players={topPlayers}
        onEdit={(id, score) => { setEditUser({ id, score }); setOpenEdit(true); }}
        onAround={(id) => { void onGetAround(id); }}
      />

      <AddUserDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        value={newUser}
        onChange={setNewUser}
        onSubmit={onAddUser}
      />
      <EditScoreDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        value={editUser}
        onChange={setEditUser}
        onSubmit={onUpdateScore}
      />
      <AroundDialog
        open={openAround}
        onClose={() => setOpenAround(false)}
        above={aroundAbove}
        user={aroundUser}
        below={aroundBelow}
      />
    </Box>
  );
}
