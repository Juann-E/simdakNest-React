// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { RolesGuard } from './auth/roles.guard';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { Reflector } from '@nestjs/core';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Aktifkan validasi global untuk semua DTO
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,        // Hapus properti yang tidak ada di DTO
    forbidNonWhitelisted: true, // Error kalau ada properti yang tidak didefinisikan
    transform: true,        // Ubah tipe data sesuai DTO (misal string jadi number)
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
