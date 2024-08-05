import { User } from 'src/auth/entity/users.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
