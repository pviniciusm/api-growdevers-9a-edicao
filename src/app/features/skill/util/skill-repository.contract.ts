import { Skill } from "../../../models/skill.model";

export interface SkillRepositoryContract {
    create: (id: string, skill: Skill) => Promise<Skill>;
}
