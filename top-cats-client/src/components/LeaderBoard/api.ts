import type { Player, NewUser, EditUser, AroundResponse } from "./types";

const API_BASE = 'https://top-cats-server.onrender.com';

export async function fetchTopPlayers(limit = 100): Promise<Player[]> {
  const res = await fetch(`${API_BASE}/leaderboard/top?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch top players");
  return res.json();
}

export async function fetchBottomPlayers(limit = 3): Promise<Player[]> {
  const res = await fetch(`${API_BASE}/leaderboard/bottom?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch bottom players");
  return res.json();
}

export async function addUser(payload: NewUser) {
  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to add user");
}

export async function updateScore({ id, score }: EditUser) {
  const res = await fetch(`${API_BASE}/users/${id}/score`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score }),
  });
  if (!res.ok) throw new Error("Failed to update score");
}

export async function getAround(userId: string, windowSize = 5): Promise<AroundResponse> {
  const res = await fetch(`${API_BASE}/users/${userId}/around?window=${windowSize}`);
  if (!res.ok) throw new Error("Failed to fetch around");
  return res.json();
}
