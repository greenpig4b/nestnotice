import { UserAuthority } from 'src/auth/entity/user-authority.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserAuthority)
export class UserAuthorityRepository extends Repository<UserAuthority> {}
