import { GrowdeverRepository } from "../../growdever/repositories/growdever.repository";
import { SkillRepository } from "../repositories/skill.repository";
import { CreateSkillUsecase } from "../usecases/create-skill.usecase";

export const createSkillUsecaseFactory = () => {
    const growdeverDb = new GrowdeverRepository();
    const database = new SkillRepository();

    return new CreateSkillUsecase(growdeverDb, database);
};
