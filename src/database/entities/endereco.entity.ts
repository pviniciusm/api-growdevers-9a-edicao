import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { GrowdeverEntity } from "./growdever.entity";

@Entity("endereco")
export class EnderecoEntity {
    @PrimaryColumn({
        name: "id_growdever",
    })
    public id: string;

    @Column()
    public rua: string;

    @Column()
    public cidade: string;

    @Column()
    public estado: string;

    @Column()
    public cep: number;

    @OneToOne(() => GrowdeverEntity, (growdever) => growdever.endereco)
    @JoinColumn({
        name: "id_growdever",
    })
    growdever: GrowdeverEntity;
}
