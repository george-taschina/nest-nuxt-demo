import { EntityRepository } from '@mikro-orm/mysql';
import { User } from '@has-george-read-backend/tour/models/user.entity';

export class UserRepository extends EntityRepository<User> {}
