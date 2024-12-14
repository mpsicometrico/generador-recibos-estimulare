import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, type: 'varchar' })
  name: string;

  @Column({ length: 100, type: 'varchar', nullable: true })
  father: string;

  @Column({ length: 100, type: 'varchar', nullable: true })
  mother: string;

  @Column({ length: 100, type: 'varchar', nullable: true })
  school: string;

  @Column({ default: true, type: 'boolean' })
  isActive: boolean;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
