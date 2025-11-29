import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    const seedService = app.get(SeederService);

    await seedService.seed();
  } catch (error) {
    console.error('seed failed', error);
    process.exit(1);
  } finally {
    await app.close();
    process.exit(0);
  }
}
bootstrap()