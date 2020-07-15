require('dotenv').config();

import { NestExpressApplication } from '@nestjs/platform-express';

import { NestFactory } from '@nestjs/core';

declare const module: any;

import * as cookieParser from 'cookie-parser';

import corsSetup from './config/cors.setup';
import swaggerSetup from './config/swagger.setup';
import pipesSetup from './config/pipes.setup';
import interceptorsSetup from './config/interceptors.setup';

import { AppModule } from './app.module';


(async function () {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
    );

    app.setGlobalPrefix('api');
    app.use(cookieParser());

    pipesSetup(app);
    interceptorsSetup(app);
    corsSetup(app);
    swaggerSetup(app);

    await app.listen(Number(process.env.PORT) || 3000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
})();
