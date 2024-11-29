import { TaskStatusEnum } from "../enums";

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status?: TaskStatusEnum;
  createdAt?: string;
}
