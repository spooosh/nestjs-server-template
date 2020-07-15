import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function swaggerSetup(app): void {
    const options = new DocumentBuilder()
        .setTitle('NestJS Template Api')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/docs', app, document);
}

export default swaggerSetup;
