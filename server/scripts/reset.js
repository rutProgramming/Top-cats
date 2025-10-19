// scripts/reset.js
const repo = require('../src/repositories/leaderboard.repo');
const pool = require('../src/db/pool');

(async () => {
  try {
    await repo.clearAll();
    console.log('Table cleared.');
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
})();
