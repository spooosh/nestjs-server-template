import { ValidationPipe } from '@nestjs/common';

function pipesSetup(app) {
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        transformOptions: {
            enableImplicitConversion: true
        },
        whitelist: true,
    }));
}

export default pipesSetup;
