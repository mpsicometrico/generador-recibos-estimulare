import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePsychologistEntity1734560827052 implements MigrationInterface {
    name = 'CreatePsychologistEntity1734560827052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "psychologist" ("id" integer NOT NULL, "name" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f390a96902b37c25a12138a73ad" UNIQUE ("email"), CONSTRAINT "PK_8306b92077e64754cda381819cf" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "psychologist"`);
    }

}
