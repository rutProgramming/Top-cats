import * as repo from '../repositories/leaderboard.repo.js';
import { ValidationError, NotFoundError } from '../errors/customError.js';

export async function getTopN(limit = 10) {
  const n = Number(limit);
  if (!Number.isInteger(n) || n <= 0) {
    throw new ValidationError('Limit must be greater than 0');
  }
  return repo.getTopN(n);
}

export async function getBottom(limit = 3) {
  const n = Number(limit);
  if (!Number.isInteger(n) || n <= 0) {
    throw new ValidationError('Limit must be greater than 0');
  }
  return repo.getBottomK(n);
}

export async function addUser({ name, image_url, score = 0 }) {
  if (!name || !image_url) {
    throw new ValidationError('Missing required fields: name and image_url');
  }
  if (Number(score) < 0) throw new ValidationError('Score must be non-negative');

  return repo.createUser({ name, image_url, score: Number(score) || 0 });
}

export async function updateScore({ id, score }) {
  if (!id) throw new ValidationError('Missing required field: id');
  if (Number(score) < 0) throw new ValidationError('Score must be non-negative');

  const exists = await repo.getUserById(id);
  if (!exists) throw new NotFoundError('User not found');

  return repo.updateScore({ id, score: Number(score) });
}

export async function getUserAround({ id, window = 5 }) {
  if (!id) throw new ValidationError('Missing required field: id');
  const win = Math.max(1, Math.min(Number(window) || 5, 50));

  const user = await repo.getUserById(id);
  if (!user) throw new NotFoundError('User not found');

  const rank = await repo.countAhead(user.score, user.id);

  const [above, below] = await Promise.all([
    repo.getAbove(user.score, user.id, win),
    repo.getBelow(user.score, user.id, win),
  ]);

  return { user, rank, above, below };
}
