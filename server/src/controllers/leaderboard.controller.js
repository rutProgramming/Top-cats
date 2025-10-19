import * as svc from '../services/leaderboard.service.js'
export async function getTopN(req, res, next) {
  try {
    const limit = Number(req.query.limit ?? 10);
    const data = await svc.getTopN(limit);
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function getBottom(req, res, next) {
  try {
    const limit = Number(req.query.limit ?? 3);
    const data = await svc.getBottom(limit);
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function addUser(req, res, next) {
  try {
    const { name, image_url, score = 0 } = req.body || {};
    const user = await svc.addUser({ name, image_url, score: Number(score) || 0 });
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
}

export async function updateUserScore(req, res, next) {
  try {
    const { id } = req.params;
    const { score } = req.body;
    const updated = await svc.updateScore({ id, score: Number(score) });
    res.json(updated);
  } catch (e) {
    next(e);
  }
}

export async function getUserAround(req, res, next) {
  try {
    const { id } = req.params;
    const window = Number(req.query.window ?? 5);
    const data = await svc.getUserAround({ id, window });    
    res.json(data);
  } catch (e) {
    next(e);
  }
}
