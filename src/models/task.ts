import { taskType } from "./taskType";

export interface task {
  idTask?: string;
  taskName: string;
  manager?: string;
  desc: string;
  createdDate?: Date;
  estimatedTime: number;
  Deadline: Date;
  Employer: string;
  taskType:taskType;
}
