import { MigrationInterface, QueryRunner } from "typeorm";

export class TestsMigration1683070237907 implements MigrationInterface {
    name = 'TestsMigration1683070237907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "endereco" ("id_growdever" varchar PRIMARY KEY NOT NULL, "rua" varchar NOT NULL, "cidade" varchar NOT NULL, "estado" varchar NOT NULL, "cep" integer NOT NULL, CONSTRAINT "REL_c61a16a427330f014ba485f2cd" UNIQUE ("id_growdever"))`);
        await queryRunner.query(`CREATE TABLE "categoria" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "dthr_criacao" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "arquivada" varchar NOT NULL, "id_growdever" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "growdever" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar(30) NOT NULL, "cpf" int8 NOT NULL, "idade" int2, "nota" integer NOT NULL, "ind_ativo" boolean NOT NULL, "dthr_atualizacao" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "avaliacao" ("id" varchar PRIMARY KEY NOT NULL, "nota" decimal(4,2) NOT NULL, "modulo" varchar(30) NOT NULL, "mentor" varchar(30), "id_growdever" varchar NOT NULL, "dthr_criacao" datetime NOT NULL DEFAULT (datetime('now')), "dthr_atualizacao" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "skill_categoria" ("id_skill" varchar NOT NULL, "id_categoria" varchar NOT NULL, PRIMARY KEY ("id_skill", "id_categoria"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eb7692f0dda836fbfe557a0e6a" ON "skill_categoria" ("id_skill") `);
        await queryRunner.query(`CREATE INDEX "IDX_1eb80dd586d2defd4487250f1e" ON "skill_categoria" ("id_categoria") `);
        await queryRunner.query(`CREATE TABLE "temporary_endereco" ("id_growdever" varchar PRIMARY KEY NOT NULL, "rua" varchar NOT NULL, "cidade" varchar NOT NULL, "estado" varchar NOT NULL, "cep" integer NOT NULL, CONSTRAINT "REL_c61a16a427330f014ba485f2cd" UNIQUE ("id_growdever"), CONSTRAINT "FK_c61a16a427330f014ba485f2cd8" FOREIGN KEY ("id_growdever") REFERENCES "growdever" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_endereco"("id_growdever", "rua", "cidade", "estado", "cep") SELECT "id_growdever", "rua", "cidade", "estado", "cep" FROM "endereco"`);
        await queryRunner.query(`DROP TABLE "endereco"`);
        await queryRunner.query(`ALTER TABLE "temporary_endereco" RENAME TO "endereco"`);
        await queryRunner.query(`CREATE TABLE "temporary_skill" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "arquivada" varchar NOT NULL, "id_growdever" varchar NOT NULL, CONSTRAINT "FK_4a965e4567c19d92615e3301bed" FOREIGN KEY ("id_growdever") REFERENCES "growdever" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_skill"("id", "nome", "arquivada", "id_growdever") SELECT "id", "nome", "arquivada", "id_growdever" FROM "skill"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`ALTER TABLE "temporary_skill" RENAME TO "skill"`);
        await queryRunner.query(`CREATE TABLE "temporary_avaliacao" ("id" varchar PRIMARY KEY NOT NULL, "nota" decimal(4,2) NOT NULL, "modulo" varchar(30) NOT NULL, "mentor" varchar(30), "id_growdever" varchar NOT NULL, "dthr_criacao" datetime NOT NULL DEFAULT (datetime('now')), "dthr_atualizacao" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "growdever_avaliacao_fk" FOREIGN KEY ("id_growdever") REFERENCES "growdever" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_avaliacao"("id", "nota", "modulo", "mentor", "id_growdever", "dthr_criacao", "dthr_atualizacao") SELECT "id", "nota", "modulo", "mentor", "id_growdever", "dthr_criacao", "dthr_atualizacao" FROM "avaliacao"`);
        await queryRunner.query(`DROP TABLE "avaliacao"`);
        await queryRunner.query(`ALTER TABLE "temporary_avaliacao" RENAME TO "avaliacao"`);
        await queryRunner.query(`DROP INDEX "IDX_eb7692f0dda836fbfe557a0e6a"`);
        await queryRunner.query(`DROP INDEX "IDX_1eb80dd586d2defd4487250f1e"`);
        await queryRunner.query(`CREATE TABLE "temporary_skill_categoria" ("id_skill" varchar NOT NULL, "id_categoria" varchar NOT NULL, CONSTRAINT "FK_eb7692f0dda836fbfe557a0e6a3" FOREIGN KEY ("id_skill") REFERENCES "skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_1eb80dd586d2defd4487250f1e0" FOREIGN KEY ("id_categoria") REFERENCES "categoria" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("id_skill", "id_categoria"))`);
        await queryRunner.query(`INSERT INTO "temporary_skill_categoria"("id_skill", "id_categoria") SELECT "id_skill", "id_categoria" FROM "skill_categoria"`);
        await queryRunner.query(`DROP TABLE "skill_categoria"`);
        await queryRunner.query(`ALTER TABLE "temporary_skill_categoria" RENAME TO "skill_categoria"`);
        await queryRunner.query(`CREATE INDEX "IDX_eb7692f0dda836fbfe557a0e6a" ON "skill_categoria" ("id_skill") `);
        await queryRunner.query(`CREATE INDEX "IDX_1eb80dd586d2defd4487250f1e" ON "skill_categoria" ("id_categoria") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_1eb80dd586d2defd4487250f1e"`);
        await queryRunner.query(`DROP INDEX "IDX_eb7692f0dda836fbfe557a0e6a"`);
        await queryRunner.query(`ALTER TABLE "skill_categoria" RENAME TO "temporary_skill_categoria"`);
        await queryRunner.query(`CREATE TABLE "skill_categoria" ("id_skill" varchar NOT NULL, "id_categoria" varchar NOT NULL, PRIMARY KEY ("id_skill", "id_categoria"))`);
        await queryRunner.query(`INSERT INTO "skill_categoria"("id_skill", "id_categoria") SELECT "id_skill", "id_categoria" FROM "temporary_skill_categoria"`);
        await queryRunner.query(`DROP TABLE "temporary_skill_categoria"`);
        await queryRunner.query(`CREATE INDEX "IDX_1eb80dd586d2defd4487250f1e" ON "skill_categoria" ("id_categoria") `);
        await queryRunner.query(`CREATE INDEX "IDX_eb7692f0dda836fbfe557a0e6a" ON "skill_categoria" ("id_skill") `);
        await queryRunner.query(`ALTER TABLE "avaliacao" RENAME TO "temporary_avaliacao"`);
        await queryRunner.query(`CREATE TABLE "avaliacao" ("id" varchar PRIMARY KEY NOT NULL, "nota" decimal(4,2) NOT NULL, "modulo" varchar(30) NOT NULL, "mentor" varchar(30), "id_growdever" varchar NOT NULL, "dthr_criacao" datetime NOT NULL DEFAULT (datetime('now')), "dthr_atualizacao" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "avaliacao"("id", "nota", "modulo", "mentor", "id_growdever", "dthr_criacao", "dthr_atualizacao") SELECT "id", "nota", "modulo", "mentor", "id_growdever", "dthr_criacao", "dthr_atualizacao" FROM "temporary_avaliacao"`);
        await queryRunner.query(`DROP TABLE "temporary_avaliacao"`);
        await queryRunner.query(`ALTER TABLE "skill" RENAME TO "temporary_skill"`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "arquivada" varchar NOT NULL, "id_growdever" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "skill"("id", "nome", "arquivada", "id_growdever") SELECT "id", "nome", "arquivada", "id_growdever" FROM "temporary_skill"`);
        await queryRunner.query(`DROP TABLE "temporary_skill"`);
        await queryRunner.query(`ALTER TABLE "endereco" RENAME TO "temporary_endereco"`);
        await queryRunner.query(`CREATE TABLE "endereco" ("id_growdever" varchar PRIMARY KEY NOT NULL, "rua" varchar NOT NULL, "cidade" varchar NOT NULL, "estado" varchar NOT NULL, "cep" integer NOT NULL, CONSTRAINT "REL_c61a16a427330f014ba485f2cd" UNIQUE ("id_growdever"))`);
        await queryRunner.query(`INSERT INTO "endereco"("id_growdever", "rua", "cidade", "estado", "cep") SELECT "id_growdever", "rua", "cidade", "estado", "cep" FROM "temporary_endereco"`);
        await queryRunner.query(`DROP TABLE "temporary_endereco"`);
        await queryRunner.query(`DROP INDEX "IDX_1eb80dd586d2defd4487250f1e"`);
        await queryRunner.query(`DROP INDEX "IDX_eb7692f0dda836fbfe557a0e6a"`);
        await queryRunner.query(`DROP TABLE "skill_categoria"`);
        await queryRunner.query(`DROP TABLE "avaliacao"`);
        await queryRunner.query(`DROP TABLE "growdever"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TABLE "categoria"`);
        await queryRunner.query(`DROP TABLE "endereco"`);
    }

}
