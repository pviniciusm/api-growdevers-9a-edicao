import { Project } from "../../../models/project.model";

export interface CreateProjectContract {
    create: (project: Project) => Promise<void>;
}
