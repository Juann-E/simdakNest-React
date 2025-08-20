import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Guards
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';

// Core Modules
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';

// Kepokmas Modules
import { NamaPasarModule } from './modules/Kepokmas/nama-pasar/nama-pasar.module';
import { SatuanBarangModule } from './modules/Kepokmas/satuan-barang/satuan-barang.module';
import { NamaBarangModule } from './modules/Kepokmas/nama-barang/nama-barang.module';
import { BarangPasarGridModule } from './modules/Kepokmas/barang-pasar-grid/barang-pasar-grid.module';
import { HargaBarangPasarModule } from './modules/Kepokmas/harga-barang-grid/harga-barang-pasar.module';
import { ReportModule } from './modules/Kepokmas/report/report.module';

// Alamat Modules
import { KecamatanModule } from './modules/Alamat/Kecamatan/kecamatan.module';
import { KelurahanModule } from './modules/Alamat/Kelurahan/kelurahan.module';

// SPBU_LPG Modules
import { SpbuModule } from './modules/SPBU_LPG/SPBU/main/spbu.module';

// Common / Public Modules
import { PublicModule } from './common/public/public.module';

@Module({
  // Global Guards
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],

  imports: [
    // Environment Config
    ConfigModule.forRoot({ isGlobal: true }),

    // Database
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

    // upload gamabr
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // URL prefix
    }),

    // Core application modules
    UserModule,
    AuthModule,

    // Kepokmas feature modules
    NamaPasarModule,
    SatuanBarangModule,
    NamaBarangModule,
    BarangPasarGridModule,
    HargaBarangPasarModule,
    ReportModule,

    // Alamat Modules
    KecamatanModule,
    KelurahanModule,

    // SPBU_LPG Module
    SpbuModule,

    // Public access module
    PublicModule,
  ],
})
export class AppModule { }
