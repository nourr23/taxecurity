import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums';

export const HasRole = (role: Role) => SetMetadata('role', role);
