// scripts/seed.js
import pool from '../src/db/pool.js';
import * as repo from '../src/repositories/leaderboard.repo.js';
const data = [
  { name:'Alice', image_url:'https://ex.com/a.jpg', score:1500 },
  { name:'Bob',   image_url:'https://ex.com/b.jpg', score:1750 },
  { name:'Chloe', image_url:'https://ex.com/c.jpg', score:1750 },
  { name:'Dan',   image_url:'https://ex.com/d.jpg', score:1400 },
  { name:'Eva',   image_url:'https://ex.com/e.jpg', score:1300 },
  { name:'Fay',   image_url:'https://ex.com/f.jpg', score:1250 },
  { name:'Gid',   image_url:'https://ex.com/g.jpg', score:1100 },
  { name:'Hod',   image_url:'https://ex.com/h.jpg', score:1050 },
  { name:'Ira',   image_url:'https://ex.com/i.jpg', score:1000 },
  { name:'Jon',   image_url:'https://ex.com/j.jpg',  score:950 },
];

(async () => {
  try {
    await repo.insertMany(data);
    console.log('Seed inserted:', data.length, 'rows');
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
})();
