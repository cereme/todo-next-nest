const ormconfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/**/*.migration{.ts,.js}'],
};

if (process.env.NODE_ENV === 'prod') {
  ormconfig.ssl = {
    rejectUnauthorized: false,
  };
}

module.exports = ormconfig;
