import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSolarpanelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  cost: number;
}
