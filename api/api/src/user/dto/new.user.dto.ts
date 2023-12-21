import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export default class NewUserDTO {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
