import { MySqlDriver, Options } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
export default {
  driver: MySqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  dbName: process.env.MIKRO_ORM_DB_NAME || 'george',
  user: process.env.MIKRO_ORM_USER || 'george',
  password: process.env.MIKRO_ORM_PASSWORD || 'george',
  host: process.env.MIKRO_ORM_HOST || 'localhost',
  port: Number(process.env.MIKRO_ORM_PORT) || 3306,
  debug: process.env.MIKRO_ORM_DEBUG === '1' ? true : false,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['libs/**/*.entity.ts'],
} satisfies Options;
