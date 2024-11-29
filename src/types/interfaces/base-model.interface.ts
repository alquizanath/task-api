export type ValidatorTypes =
  | "string"
  | "name"
  | "phone"
  | "email"
  | "address"
  | "numeric"
  | "int";

export type ValidationInterface = {
  [key: string]: Array<ValidatorTypes>;
};

export interface ModelInterface {
  _table?: string;
  _protected?: Array<string>;
  _required?: Array<string>;
  _validation?: ValidationInterface;
}
