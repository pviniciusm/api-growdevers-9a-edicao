import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("categoria")
export class CategoriaEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    @CreateDateColumn({
        name: "dthr_criacao",
    })
    dthrCriacao: Date;
}
