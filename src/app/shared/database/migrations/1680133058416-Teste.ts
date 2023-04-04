import { MigrationInterface, QueryRunner } from "typeorm";

export class Teste1680133058416 implements MigrationInterface {
    name = "Teste1680133058416";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "aula"."categoria" ("id" character varying NOT NULL, "nome" character varying NOT NULL, CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "aula"."skill" ("id" character varying NOT NULL, "nome" character varying NOT NULL, "arquivada" character varying NOT NULL, "id_growdever" character varying NOT NULL, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "aula"."growdever" ("id" character varying NOT NULL, "nome" character varying(30) NOT NULL, "cpf" bigint NOT NULL, "idade" smallint, "nota" integer NOT NULL, "ind_ativo" boolean NOT NULL, "dthr_atualizacao" TIMESTAMP NOT NULL, CONSTRAINT "PK_e4de93ef840d0194b464e76b34b" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "aula"."endereco" ("id_growdever" character varying NOT NULL, "rua" character varying NOT NULL, "cidade" character varying NOT NULL, "estado" character varying NOT NULL, "cep" integer NOT NULL, CONSTRAINT "REL_c61a16a427330f014ba485f2cd" UNIQUE ("id_growdever"), CONSTRAINT "PK_c61a16a427330f014ba485f2cd8" PRIMARY KEY ("id_growdever"))`
        );
        await queryRunner.query(
            `CREATE TABLE "aula"."skill_categoria" ("id_skill" character varying NOT NULL, "id_categoria" character varying NOT NULL, CONSTRAINT "PK_bf706d86a47bd52d33af9ea45b2" PRIMARY KEY ("id_skill", "id_categoria"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_eb7692f0dda836fbfe557a0e6a" ON "aula"."skill_categoria" ("id_skill") `
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_1eb80dd586d2defd4487250f1e" ON "aula"."skill_categoria" ("id_categoria") `
        );
        await queryRunner.query(
            `ALTER TABLE "aula"."skill" ADD CONSTRAINT "FK_4a965e4567c19d92615e3301bed" FOREIGN KEY ("id_growdever") REFERENCES "aula"."growdever"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "aula"."endereco" ADD CONSTRAINT "FK_c61a16a427330f014ba485f2cd8" FOREIGN KEY ("id_growdever") REFERENCES "aula"."growdever"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "aula"."skill_categoria" ADD CONSTRAINT "FK_eb7692f0dda836fbfe557a0e6a3" FOREIGN KEY ("id_skill") REFERENCES "aula"."skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        );
        await queryRunner.query(
            `ALTER TABLE "aula"."skill_categoria" ADD CONSTRAINT "FK_1eb80dd586d2defd4487250f1e0" FOREIGN KEY ("id_categoria") REFERENCES "aula"."categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "aula"."skill_categoria" DROP CONSTRAINT "FK_1eb80dd586d2defd4487250f1e0"`
        );
        await queryRunner.query(
            `ALTER TABLE "aula"."skill_categoria" DROP CONSTRAINT "FK_eb7692f0dda836fbfe557a0e6a3"`
        );
        await queryRunner.query(
            `ALTER TABLE "aula"."endereco" DROP CONSTRAINT "FK_c61a16a427330f014ba485f2cd8"`
        );
        await queryRunner.query(
            `ALTER TABLE "aula"."skill" DROP CONSTRAINT "FK_4a965e4567c19d92615e3301bed"`
        );
        await queryRunner.query(
            `DROP INDEX "aula"."IDX_1eb80dd586d2defd4487250f1e"`
        );
        await queryRunner.query(
            `DROP INDEX "aula"."IDX_eb7692f0dda836fbfe557a0e6a"`
        );
        await queryRunner.query(`DROP TABLE "aula"."skill_categoria"`);
        await queryRunner.query(`DROP TABLE "aula"."endereco"`);
        await queryRunner.query(`DROP TABLE "aula"."growdever"`);
        await queryRunner.query(`DROP TABLE "aula"."skill"`);
        await queryRunner.query(`DROP TABLE "aula"."categoria"`);
    }
}
