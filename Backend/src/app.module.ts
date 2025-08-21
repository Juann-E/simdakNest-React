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
import { KecamatanModule } from './modules/Setting/Kecamatan/kecamatan.module';
import { KelurahanModule } from './modules/Setting/Kelurahan/kelurahan.module';

// SPBU_LPG Modules
<<<<<<< HEAD
import { SpbuModule } from './modules/SPBU_LPG/SPBU/main/spbu.module';
import { RefDokuSpbuModule } from './modules/SPBU_LPG/SPBU/refrensi_doku_spbu/ref-doku-spbu.module';
import { DokumenSpbuModule } from './modules/SPBU_LPG/SPBU/dokumen_spbu/dokumen-spbu.module';
import { AgenModule } from './modules/SPBU_LPG/Agen/agen.module';
import { PangkalanLpgModule } from './modules/SPBU_LPG/PangkalanLpg/pangkalan-lpg.module';
import { SpbeModule } from './modules/SPBU_LPG/Spbe/spbe.module';
=======
import { SpbuModule } from './modules/SPBU_LPG/SPBU/spbu.module';
>>>>>>> 17ac419b52c9b842fb9c18161347fe3832cdc14e

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
<<<<<<< HEAD
    RefDokuSpbuModule,
    DokumenSpbuModule,
    AgenModule,
    PangkalanLpgModule,
    SpbeModule,
=======

>>>>>>> 17ac419b52c9b842fb9c18161347fe3832cdc14e
    
    // Public access module
    PublicModule,
  ],
})
export class AppModule { }
