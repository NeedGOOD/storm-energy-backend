import { PartialType } from '@nestjs/mapped-types';
import { CreateWindmillDto } from './create-windmill.dto';

export class UpdateWindmillDto extends PartialType(CreateWindmillDto) {
    name?: string;
    model?: string;
    description?: string;
    cost?: number;
}
