import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPaidColumnInvoice1735263809019 implements MigrationInterface {
    name = 'AddPaidColumnInvoice1735263809019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" ADD "paid" numeric(6,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "price" TYPE numeric(7,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "price" TYPE numeric(6,2)`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "paid"`);
    }

}
