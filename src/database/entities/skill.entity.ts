import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { GrowdeverEntity } from "./growdever.entity";

@Entity("skill")
export class SkillEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    @Column()
    arquivada: string;

    @Column({
        name: "id_growdever",
    })
    idGrowdever: string;

    @ManyToOne(() => GrowdeverEntity)
    @JoinColumn({
        name: "id_growdever",
    })
    growdever: GrowdeverEntity;
}

// Growdever  - 1 ---- N - Skill
