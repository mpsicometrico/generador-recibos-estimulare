import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationPsychologistPatient1734629885901 implements MigrationInterface {
    name = 'AddRelationPsychologistPatient1734629885901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" ADD "psychologistId" integer`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_99237aeba3526cf8da1618b0807" FOREIGN KEY ("psychologistId") REFERENCES "psychologist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_99237aeba3526cf8da1618b0807"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "psychologistId"`);
    }

}
