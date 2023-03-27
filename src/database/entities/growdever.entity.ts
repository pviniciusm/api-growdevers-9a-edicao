import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    BaseEntity,
} from "typeorm";

@Entity({
    name: "growdever",
})
export class GrowdeverEntity {
    @PrimaryColumn()
    id: string;

    @Column({
        length: 30,
    })
    nome: string;

    @Column({
        type: "int4",
    })
    cpf: number;

    @Column({
        nullable: true,
        type: "int2",
    })
    idade: number;

    @Column()
    nota: number;

    @Column({
        name: "ind_ativo",
    })
    indAtivo: boolean;
}
