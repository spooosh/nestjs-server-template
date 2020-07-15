require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development';

let ormconfig: object = {
    type: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD || null,
    synchronize: false,
    entities: [__dirname + '/**/*.entity.{js,ts}'],
    migrations: [__dirname + '/**/migrations/*.{js,ts}'],
    extra: {
        charset: 'utf8mb4_unicode_ci'
    }
};

module.exports = ormconfig;
