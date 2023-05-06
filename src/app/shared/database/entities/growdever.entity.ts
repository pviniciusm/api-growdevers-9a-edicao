import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    BaseEntity,
    BeforeUpdate,
    OneToMany,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { EnderecoEntity } from "./endereco.entity";
import { SkillEntity } from "./skill.entity";
import { ProjectEntity } from "./project.entity";

@Entity({
    name: "growdever",
})
export class GrowdeverEntity extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column({
        length: 30,
    })
    nome: string;

    @Column({
        type: "int8",
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

    @UpdateDateColumn({
        name: "dthr_atualizacao",
    })
    dthrAtualizacao: Date;

    @OneToMany(() => SkillEntity, (skill) => skill.growdever, {
        eager: true,
    })
    skills: SkillEntity[];

    @OneToMany(() => ProjectEntity, (project) => project.growdever, {
        eager: true,
    })
    projects: ProjectEntity[];

    @OneToOne(() => EnderecoEntity, (endereco) => endereco.growdever)
    endereco: EnderecoEntity;

    @BeforeUpdate()
    beforeUpdate() {
        this.dthrAtualizacao = new Date();
    }
}
