import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { GrowdeverEntity } from "./growdever.entity";

@Entity("avaliacao")
export class AvaliacaoEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "decimal",
        scale: 2,
        precision: 4,
    })
    nota: string;

    @Column({
        length: 30,
    })
    modulo: string;

    @Column({
        length: 30,
        nullable: true,
    })
    mentor: string;

    @Column({
        name: "id_growdever",
    })
    idGrowdever: string;

    @ManyToOne(() => GrowdeverEntity, {
        onDelete: "CASCADE",
    })
    @JoinColumn({
        name: "id_growdever",
        foreignKeyConstraintName: "growdever_avaliacao_fk",
    })
    growdever: GrowdeverEntity;

    @CreateDateColumn({
        name: "dthr_criacao",
    })
    dthrCriacao: Date;

    @UpdateDateColumn({
        name: "dthr_atualizacao",
    })
    dthrAtualizacao: Date;
}
