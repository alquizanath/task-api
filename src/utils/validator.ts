import { ValidationInterface } from "src/types";
import ValidatorJS from "validatorjs";

const VALIDATOR_RULES = {
  string: ["min:1"],
  name: ["min:1"],
  phone: ["regex:/^(09|\\+639|9)\\d{9}/"],
  email: ["email"],
  address: ["max:300"],
  numeric: ["numeric"],
  int: ["integer"],
};

const formatValidator = async (
  validation: ValidationInterface,
  requiredFields: string[]
): Promise<Record<string, string[]>> => {
  const formattedRules: Record<string, string[]> = {};

  for (const field in validation) {
    formattedRules[field] = requiredFields.includes(field) ? ["required"] : [];

    validation[field].forEach((rule) => {
      if (VALIDATOR_RULES[rule]) {
        formattedRules[field] = formattedRules[field].concat(
          VALIDATOR_RULES[rule]
        );
      }
    });
  }

  return formattedRules;
};

const validate = async (
  data: Record<string, any>,
  validationSchema: ValidationInterface = {},
  requiredFields: string[] = []
) => {
  const formattedRules = await formatValidator(
    validationSchema,
    requiredFields
  );
  const validator = new ValidatorJS(data, formattedRules);

  return [validator.passes(), validator.errors.all()];
};

export { validate };
