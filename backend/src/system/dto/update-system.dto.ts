import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemDto } from './create-system.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSystemDto extends PartialType(CreateSystemDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  location?: string;
}
