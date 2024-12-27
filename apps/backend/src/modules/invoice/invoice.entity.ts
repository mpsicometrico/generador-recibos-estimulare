import { Patient } from '../patient/patient.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, type: 'varchar' })
  type: string;

  @Column({ type: 'numeric', precision: 7, scale: 2 })
  price: number;

  @Column({ type: 'numeric', precision: 6, scale: 2 })
  paid: number;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => Patient, (patient) => patient.invoices)
  patient: Patient;
}
