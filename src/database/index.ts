// Conexão com o database
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { User } from './models/User';

import { schemas } from './schemas';

// Instância do SQLite
const adapter = new SQLiteAdapter({
  schema: schemas
});

export const database = new Database({
  adapter,
  modelClasses: [User]
});
