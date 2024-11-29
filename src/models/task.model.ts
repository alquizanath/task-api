import { ValidationInterface } from "src/types";
import BaseModel from "./_base.model";

class Task extends BaseModel {
  _table = "task";

  _validation: ValidationInterface = {
    title: ["string"],
  };

  _required = ["title"];
}

const task = new Task();

export default task;
