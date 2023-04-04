import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultNowDthrAtualizacaoGrowdever1680564306596
    implements MigrationInterface
{
    name = "AddDefaultNowDthrAtualizacaoGrowdever1680564306596";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "aula"."growdever" ALTER COLUMN "dthr_atualizacao" SET DEFAULT now()`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "aula"."growdever" ALTER COLUMN "dthr_atualizacao" DROP DEFAULT`
        );
    }
}
