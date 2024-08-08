import { Status } from "./Status";
import { taskType } from "./taskType";

export interface task {
  idTask?: string;
  taskName: string;
  manager?: string;
  desc: string;
  createdDate?: Date;
  estimatedTime: number;
  deadline: Date;
  employer: string;
  taskType:taskType;
  projectId?: string;
  status:Status;
}
