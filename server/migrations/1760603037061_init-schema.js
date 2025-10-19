exports.up = pgm => {
  pgm.createExtension('pgcrypto', { ifNotExists: true });

  pgm.createTable('leaderboard_users', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    name: { type: 'text', notNull: true },
    image_url: { type: 'text', notNull: true },
    score: { type: 'bigint', notNull: true, default: 0 },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });

  pgm.createIndex('leaderboard_users', ['score', 'id'], {
    name: 'idx_leaderboard_order',
    unique: false,
  });
};

exports.down = pgm => {
  pgm.dropTable('leaderboard_users');
};
