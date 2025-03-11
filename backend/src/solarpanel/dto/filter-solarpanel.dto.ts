import { PartialType } from '@nestjs/mapped-types';
import { CreateSolarpanelDto } from './create-solarpanel.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterSolarpanelDto extends PartialType(CreateSolarpanelDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  cost?: number;
}
