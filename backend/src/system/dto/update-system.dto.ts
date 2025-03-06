import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemDto } from './create-system.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSystemDto extends PartialType(CreateSystemDto) {
  @IsString()
  @IsNotEmpty()
  location?: string;
}
