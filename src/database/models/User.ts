import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class User extends Model {
  static table = 'users'; // Nome da tabela

  @field('user_id') // Nome do campo na table (utilizando o decorator)
  user_id!: string; // Nome que usaremos no código

  @field('name')
  name!: string;

  @field('email')
  email!: string;

  @field('driver_license')
  driver_license!: string;

  @field('avatar')
  avatar!: string;

  @field('token')
  token!: string;
}

export { User };
