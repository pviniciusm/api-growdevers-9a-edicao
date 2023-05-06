import { Project } from "../../../models/project.model";

export interface ListProjectsContract {
    list: (idGrowdever: string) => Promise<Project[]>;
}
