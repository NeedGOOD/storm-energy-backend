import { PartialType } from '@nestjs/mapped-types';
import { CreateSolarpanelDto } from './create-solarpanel.dto';

export class UpdateSolarpanelDto extends PartialType(CreateSolarpanelDto) {
  name?: string;
  model?: string;
  description?: string;
  cost?: number;
}
