import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import helmet from 'helmet';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');
    
    app.use(helmet());
    
    app.enableCors({
        origin:process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3001'],
        credentials:true,
    });

app.useGlobalPipes(
    new ValidationPipe({
        whitelist:true,
        forbidNonWhitelisted:true,
        transform:true,
    }),
);

    const port = Number(process.env.PORT ?? 3000);
    await app.listen(port);
    console.log(`BTX Backend is running on http://localhost:${port}/api/v1`);
}

bootstrap();


