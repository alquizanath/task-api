import { CustomErrorInterface, HttpStatusCode } from "../types";

class CustomError implements CustomErrorInterface {
    message!: string | unknown;
    status!: number;
    constructor(
      message: string | unknown,
      status: number = HttpStatusCode.INTERNAL_SERVER
    ) {
      this.message = message;
      this.status = status;
    }
  }
  
  export default CustomError;