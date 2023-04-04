import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableAvaliacao1680136487724 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.createTable(
            new Table({
                name: "avaliacao",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        primaryKeyConstraintName: "pk_avaliacao",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "nota",
                        type: "decimal",
                        scale: 2,
                        precision: 4,
                        isNullable: false,
                    },
                    {
                        name: "modulo",
                        type: "varchar",
                        length: "30",
                    },
                    {
                        name: "mentor",
                        type: "varchar",
                        length: "30",
                        isNullable: true,
                    },
                    {
                        name: "id_growdever",
                        type: "varchar",
                    },
                ],
                foreignKeys: [
                    {
                        name: "growdever_avaliacao_fk",
                        columnNames: ["id_growdever"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "growdever",
                        onDelete: "cascade",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("avaliacao");
    }
}
