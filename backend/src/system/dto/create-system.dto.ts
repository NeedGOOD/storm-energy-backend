import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateSystemDto {
  @IsString()
  @IsNotEmpty()
  location: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  solarPanelId: number;

  @IsInt()
  @IsNotEmpty()
  accumulatorId: number;
}
