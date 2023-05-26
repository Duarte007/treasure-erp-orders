import { ConnectionOptions } from 'typeorm';

const typeOrmConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/modules/**/entities/*.entity.{ts,js}'],
  migrations: ['src/common/database/migrations/*.{ts,js}'],
  cli: {
    entitiesDir: 'src/modules/entities',
    migrationsDir: 'src/common/database/migrations',
  },
};

export = typeOrmConfig;
