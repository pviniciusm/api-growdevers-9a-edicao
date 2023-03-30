import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableAvaliacao1680138212821 implements MigrationInterface {
    name = 'CreateTableAvaliacao1680138212821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "aula"."avaliacao" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nota" numeric(4,2) NOT NULL, "modulo" character varying(30) NOT NULL, "mentor" character varying(30), "id_growdever" character varying NOT NULL, "dthr_criacao" TIMESTAMP NOT NULL DEFAULT now(), "dthr_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fd3e156019eb4b68c6c9f746d51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "aula"."avaliacao" ADD CONSTRAINT "growdever_avaliacao_fk" FOREIGN KEY ("id_growdever") REFERENCES "aula"."growdever"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aula"."avaliacao" DROP CONSTRAINT "growdever_avaliacao_fk"`);
        await queryRunner.query(`DROP TABLE "aula"."avaliacao"`);
    }

}
