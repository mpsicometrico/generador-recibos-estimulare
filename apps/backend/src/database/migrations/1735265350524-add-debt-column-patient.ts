import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDebtColumnPatient1735265350524 implements MigrationInterface {
  name = 'AddDebtColumnPatient1735265350524';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "debt" numeric(7,2) NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "debt"`);
  }
}
