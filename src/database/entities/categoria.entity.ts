import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("categoria")
export class CategoriaEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;
}
