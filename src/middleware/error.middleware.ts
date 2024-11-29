import { HttpStatusCode } from "../types";

export default async (err: any, req: any, res: any, next: any) => {
  const status =
    typeof err.status === "number"
      ? err.status
      : HttpStatusCode.INTERNAL_SERVER;

  return res.status(status).json({
    code: status,
    message: err.message,
  });
};
