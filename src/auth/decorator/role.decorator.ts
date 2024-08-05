import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../enum/role-tpye';

export const Roles = (...roles: RoleType[]): any => SetMetadata('roles', roles);
