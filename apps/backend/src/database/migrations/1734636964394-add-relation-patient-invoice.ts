import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationPatientInvoice1734636964394 implements MigrationInterface {
    name = 'AddRelationPatientInvoice1734636964394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" ADD "patientId" integer`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_3badbdda05962b459d4c3c7eb8a" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_3badbdda05962b459d4c3c7eb8a"`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "patientId"`);
    }

}
