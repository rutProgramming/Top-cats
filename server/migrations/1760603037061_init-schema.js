/** @type {import('node-pg-migrate').MigrationBuilder} */
export const up = async (pgm) => {
  pgm.createExtension('uuid-ossp', { ifNotExists: true });

  pgm.createTable('users', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('uuid_generate_v4()') },
    name: { type: 'text', notNull: true },
    image_url: { type: 'text' },
    score: { type: 'integer', notNull: true, default: 0 },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  }, { ifNotExists: true });

  pgm.createIndex('users', ['score DESC', 'name'], {
    name: 'idx_users_score_desc',
    ifNotExists: true,
  });
};

/** @type {import('node-pg-migrate').MigrationBuilder} */
export const down = async (pgm) => {
  pgm.dropIndex('users', ['score DESC', 'name'], { ifExists: true, name: 'idx_users_score_desc' });
  pgm.dropTable('users', { ifExists: true });
};
