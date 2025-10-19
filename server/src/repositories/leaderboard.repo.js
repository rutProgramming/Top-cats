import pool from '../db/pool.js';
import { mapUserRow } from '../models/user.model.js';

export async function createUser({ name, image_url, score = 0 }) {
  const { rows } = await pool.query(
    `
    INSERT INTO leaderboard_users (name, image_url, score, updated_at)
    VALUES ($1, $2, $3, now())
    RETURNING id, name, image_url, score
    `,
    [name, image_url, score]
  );
  return mapUserRow(rows[0]);
}

export async function updateScore({ id, score }) {
  const { rows } = await pool.query(
    `
    UPDATE leaderboard_users
    SET score = $2, updated_at = now()
    WHERE id = $1
    RETURNING id, name, image_url, score
    `,
    [id, score]
  );
  return rows[0] ? mapUserRow(rows[0]) : null;
}

export async function getTopN(limit = 10) {
  const { rows } = await pool.query(
    `
    SELECT id, name, image_url, score
    FROM leaderboard_users
    ORDER BY score DESC, id ASC
    LIMIT $1
    `,
    [limit]
  );
  return rows.map(mapUserRow);
}

export async function getBottomK(limit = 3) {
  const { rows } = await pool.query(
    `
    SELECT id, name, image_url, score
    FROM leaderboard_users
    ORDER BY score ASC, id DESC
    LIMIT $1
    `,
    [limit]
  );
  return rows.map(mapUserRow);
}

export async function getUserById(id) {
  const { rows } = await pool.query(
    `SELECT id, name, image_url, score FROM leaderboard_users WHERE id = $1`,
    [id]
  );
  return rows[0] ? mapUserRow(rows[0]) : null;
}

export async function countAhead(score, id) {
  const { rows } = await pool.query(
    `
    SELECT 1 + COUNT(*)::bigint AS rank
    FROM leaderboard_users
    WHERE score > $1
       OR (score = $1 AND id < $2)
    `,
    [score, id]
  );
  return Number(rows[0].rank);
}

export async function getAbove(score, id, k = 5) {
  const { rows } = await pool.query(
    `
    SELECT id, name, image_url, score
    FROM leaderboard_users
    WHERE score > $1
       OR (score = $1 AND id < $2)
    ORDER BY score DESC, id ASC
    LIMIT $3
    `,
    [score, id, k]
  );
  return rows.map(mapUserRow);
}

export async function getBelow(score, id, k = 5) {
  const { rows } = await pool.query(
    `
    SELECT id, name, image_url, score
    FROM leaderboard_users
    WHERE score < $1
       OR (score = $1 AND id > $2)
    ORDER BY score DESC, id ASC
    LIMIT $3
    `,
    [score, id, k]
  );
  return rows.map(mapUserRow);
}

export async function insertMany(users) {
  if (!users?.length) return [];
  const values = [];
  const params = [];
  users.forEach((u, i) => {
    const base = i * 3;
    values.push(`($${base + 1}, $${base + 2}, $${base + 3}, now())`);
    params.push(u.name, u.image_url, u.score ?? 0);
  });
  const { rows } = await pool.query(
    `
    INSERT INTO leaderboard_users (name, image_url, score, updated_at)
    VALUES ${values.join(',')}
    RETURNING id, name, image_url, score
    `,
    params
  );
  return rows.map(mapUserRow);
}

export async function clearAll() {
  await pool.query(`DELETE FROM leaderboard_users`);
}


export async function getUserWithNeighbors(id, window = 5) {
  const me = await getUserById(id);
  if (!me) return null;

  const [rank, above, below] = await Promise.all([
    countAhead(me.score, me.id),
    getAbove(me.score, me.id, window),
    getBelow(me.score, me.id, window),
  ]);

  return { user: me, rank, above, below };
}
