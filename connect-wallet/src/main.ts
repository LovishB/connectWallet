import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000; //dynamic port allocation
  await app.listen(PORT, () =>
    console.log(`API-GATEWAY running on PORT ${PORT}`),
  );
}
bootstrap();
