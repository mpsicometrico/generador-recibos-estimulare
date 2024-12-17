import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInvoiceEntity1734472025365 implements MigrationInterface {
  name = 'CreateInvoiceEntity1734472025365';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invoice" ("id" SERIAL NOT NULL, "type" character varying(100) NOT NULL, "price" numeric(6,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "patient"`);
  }
}
