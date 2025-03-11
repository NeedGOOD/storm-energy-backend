import { IsBoolean, IsNotEmpty } from "class-validator";

export class CreateAccumulatorDto {
  @IsBoolean()
  @IsNotEmpty()
  state: boolean;
}
