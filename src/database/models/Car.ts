import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class Car extends Model {
  static table = 'cars'; // Nome da tabela

  @field('name') // Nome do campo na table (utilizando o decorator)
  name!: string; // Nome que usaremos no código

  @field('brand')
  brand!: string;

  @field('about')
  about!: string;

  @field('fuel_type')
  fuel_type!: string;

  @field('period')
  period!: string;

  @field('price')
  price!: number;

  @field('thumbnail')
  thumbnail!: string;
}

export { Car };
