import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../security/enum/role-type';

export const Roles = (...roles: RoleType[]): any => SetMetadata('roles', roles);
