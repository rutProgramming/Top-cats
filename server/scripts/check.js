const repo = require('../src/repositories/leaderboard.repo');
const pool = require('../src/db/pool');

(async () => {
  try {
    const top10 = await repo.selectTopN(10);
    console.log('TOP 10:\n', top10);

    // const positions = await repo.selectPositions([2,5,10]);
    // console.log('Positions 2/5/10:\n', positions);

    const bottom3 = await repo.selectBottomK(3);
    console.log('BOTTOM 3:\n', bottom3);
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
})();
