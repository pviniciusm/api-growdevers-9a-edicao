import { MigrationInterface, QueryRunner } from "typeorm";

export class SegundaMigration1680133343526 implements MigrationInterface {
    name = 'SegundaMigration1680133343526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aula"."endereco" DROP CONSTRAINT "FK_c61a16a427330f014ba485f2cd8"`);
        await queryRunner.query(`ALTER TABLE "aula"."endereco" ADD CONSTRAINT "UQ_c61a16a427330f014ba485f2cd8" UNIQUE ("id_growdever")`);
        await queryRunner.query(`ALTER TABLE "aula"."endereco" ADD CONSTRAINT "FK_c61a16a427330f014ba485f2cd8" FOREIGN KEY ("id_growdever") REFERENCES "aula"."growdever"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aula"."endereco" DROP CONSTRAINT "FK_c61a16a427330f014ba485f2cd8"`);
        await queryRunner.query(`ALTER TABLE "aula"."endereco" DROP CONSTRAINT "UQ_c61a16a427330f014ba485f2cd8"`);
        await queryRunner.query(`ALTER TABLE "aula"."endereco" ADD CONSTRAINT "FK_c61a16a427330f014ba485f2cd8" FOREIGN KEY ("id_growdever") REFERENCES "aula"."growdever"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
