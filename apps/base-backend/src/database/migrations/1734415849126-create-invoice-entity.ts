import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInvoiceEntity1734415849126 implements MigrationInterface {
    name = 'CreateInvoiceEntity1734415849126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invoice" ("id" SERIAL NOT NULL, "type" character varying(100) NOT NULL, "price" real NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD "price" double precision(6,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD "price" real NOT NULL`);
        await queryRunner.query(`DROP TABLE "invoice"`);
    }

}
