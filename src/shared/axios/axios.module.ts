import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { AxiosService } from './axios.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [AxiosService],
  exports: [AxiosService],
})
export class AxiosModule {}
