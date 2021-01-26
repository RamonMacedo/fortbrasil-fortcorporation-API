import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('establishments')
class Establishment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  estab_name: string;

  @Column()
  fantasy_name?: string;

  @Column()
  description?: string;

  @Column()
  cnpj: string;

  @Column()
  zipcode?: string;

  @Column()
  address: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  avatar?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar' })
  getAvatar(): string | null {
    if (!this.avatar) {
      return null;
    }
    return `${process.env.S3_ESTABLISHMENTS}/${this.avatar}`;
  }
}

export default Establishment;
