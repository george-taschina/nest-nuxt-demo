import { MySqlDriver, Options } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default {
  driver: MySqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  dbName: 'george',
  user: 'george',
  password: 'george',
  host: 'localhost',
  port: 3306,
  debug: true,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['libs/**/*.entity.ts'],
} satisfies Options;
