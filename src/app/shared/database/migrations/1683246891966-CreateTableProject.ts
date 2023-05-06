import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableProject1683246891966 implements MigrationInterface {
    name = "CreateTableProject1683246891966";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "aula"."project" ("id" character varying NOT NULL, "ind_ativo" boolean NOT NULL DEFAULT true, "nome" character varying NOT NULL, "dt_entrega" TIMESTAMP NOT NULL, "growdever_id" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "aula"."categoria" ALTER COLUMN "dthr_criacao" SET DEFAULT now()`
        );
        await queryRunner.query(
            `ALTER TABLE "aula"."project" ADD CONSTRAINT "FK_525c19d0326c94440606d8760bc" FOREIGN KEY ("growdever_id") REFERENCES "aula"."growdever"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "aula"."project" DROP CONSTRAINT "FK_525c19d0326c94440606d8760bc"`
        );
        await queryRunner.query(
            `ALTER TABLE "aula"."categoria" ALTER COLUMN "dthr_criacao" DROP DEFAULT`
        );
        await queryRunner.query(`DROP TABLE "aula"."project"`);
    }
}
