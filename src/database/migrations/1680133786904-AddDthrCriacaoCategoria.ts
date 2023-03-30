import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDthrCriacaoCategoria1680133786904 implements MigrationInterface {
    name = 'AddDthrCriacaoCategoria1680133786904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aula"."categoria" ADD "dthr_criacao" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aula"."categoria" DROP COLUMN "dthr_criacao"`);
    }

}
