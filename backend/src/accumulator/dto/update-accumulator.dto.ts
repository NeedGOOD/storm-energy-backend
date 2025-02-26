import { PartialType } from '@nestjs/mapped-types';
import { CreateAccumulatorDto } from './create-accumulator.dto';

export class UpdateAccumulatorDto extends PartialType(CreateAccumulatorDto) {
    state?: boolean;
}
