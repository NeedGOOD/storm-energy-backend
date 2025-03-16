import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateSystemDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  solarPanelId: number;

  @IsInt()
  @IsNotEmpty()
  accumulatorId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
