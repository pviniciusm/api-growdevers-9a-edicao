import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { CategoriaEntity } from "./categoria.entity";
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

    @ManyToMany(() => CategoriaEntity)
    @JoinTable({
        name: "skill_categoria",
        inverseJoinColumn: {
            name: "id_categoria",
        },
        joinColumn: {
            name: "id_skill",
        },
    })
    categorias: CategoriaEntity[];
}
