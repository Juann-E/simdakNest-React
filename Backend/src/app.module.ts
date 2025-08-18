import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { NamaPasarModule } from './modules/Kepokmas/nama-pasar/nama-pasar.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { SatuanBarangModule } from './modules/Kepokmas/satuan-barang/satuan-barang.module';
import { NamaBarangModule } from './modules/Kepokmas/nama-barang/nama-barang.module';
import { BarangPasarGridModule } from './modules/Kepokmas/barang-pasar-grid/barang-pasar-grid.module';
import { HargaBarangPasarModule } from './modules/Kepokmas/harga-barang-grid/harga-barang-pasar.module';
import { ReportModule } from './modules/Kepokmas/report/report.module';
import { PublicModule } from './modules/public/public.module'; // <-- 1. Impor modul baru

@Module({
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // env
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    NamaPasarModule,
    SatuanBarangModule,
    NamaBarangModule,
    BarangPasarGridModule,
    HargaBarangPasarModule,
    ReportModule,
    PublicModule,  
  ],
})
export class AppModule {}