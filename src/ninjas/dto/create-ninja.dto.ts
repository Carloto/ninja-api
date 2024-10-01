import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3)
  name: string;

  @IsEnum(['shurikens', 'nunchucks'], { message: 'incorrect weapon type' })
  weapon: 'shuriken' | 'nunchucks';
}
