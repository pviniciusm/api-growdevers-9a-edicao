import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { GrowdeverEntity } from "./growdever.entity";

@Entity("project")
export class ProjectEntity {
    @PrimaryColumn()
    id: string;

    @Column({
        default: true,
        name: "ind_ativo",
    })
    indAtivo: boolean;

    @Column()
    nome: string;

    @Column({
        name: "dt_entrega",
    })
    dtEntrega: Date;

    @Column({
        name: "growdever_id",
    })
    growdeverId: string;

    @ManyToOne(() => GrowdeverEntity)
    @JoinColumn({
        name: "growdever_id",
    })
    growdever: GrowdeverEntity;
}
