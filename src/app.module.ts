import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ProductosController } from './productos/productos.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, ProductosController],
  providers: [AppService],
})
export class AppModule {}
