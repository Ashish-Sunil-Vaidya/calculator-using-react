import { Severity,History } from "../redux/calculatorSlice";

export function evaluate(
  operand1: string,
  operand2: string | null,
  operator: string
): { result: string; error: { message: string; severity: Severity } | null } {
  switch (operator) {
    case "+":
      return {
        result: String(Number(operand1) + Number(operand2)),
        error: null,
      };
    case "-":
      return {
        result: String(Number(operand1) - Number(operand2)),
        error: null,
      };
    case "×":
      return {
        result: String(Number(operand1) * Number(operand2)),
        error: null,
      };
    case "/":
      if (Number(operand2) === 0) {
        return {
          result: "",
          error: { message: "Cannot divide by zero", severity: "error" },
        };
      }
      return {
        result: String(Number(operand1) / Number(operand2)),
        error: null,
      };
    case "x²":
      return { result: String(Math.pow(Number(operand1), 2)), error: null };
    case "√":
      if (Number(operand1) < 0) {
        return {
          result: "",
          error: {
            message: "Cannot take square root of negative number",
            severity: "error",
          },
        };
      }
      return { result: String(Math.sqrt(Number(operand1))), error: null };
    case "1/x":
      if (Number(operand1) === 0) {
        return {
          result: "",
          error: {
            message: "Cannot take reciprocal of zero",
            severity: "error",
          },
        };
      }
      return { result: String(1 / Number(operand1)), error: null };
    case "±":
      return { result: String(Number(operand1) * -1), error: null };
    default:
      return {
        result: "",
        error: { message: "Invalid operator", severity: "error" },
      };
  }
}

export const isOperator = (value: string) => {
  return ["+", "-", "×", "/", "%"].includes(value);
};

export const isUnaryOperator = (value: string) => {
  return ["x²", "√", "1/x", "±"].includes(value);
};

export const isDigit = (value: string) => {
  return !isNaN(Number(value));
};

export const isDecimal = (value: string) => {
  // console.log("isDecimal", value === ".");
  return value === ".";
};

export const createUnaryExpressionString = (
  inputData: string,
  operator: string
) => {
  let expression = "";
  switch (operator) {
    case "x²":
      expression = `(${inputData})²`;
      break;
    case "√":
      expression = `√(${inputData})`;
      break;
    case "1/x":
      expression = `1/(${inputData})`;
      break;
    case "±":
      expression = `(-${inputData})`;
      break;
    default:
      break;
  }
  return expression;
};

export const createBinaryExpressionString = (
  operand1: string,
  operand2: string,
  operator: string
) => {
  return `${operand1} ${operator} ${operand2}`;
};

export const setHistoryToLocalStorage = (history:History[]) => {
  localStorage.setItem("history", JSON.stringify(history));
};

export const getHistoryFromLocalStorage = () => {
  const history = localStorage.getItem("history");
  if (history) {
    return JSON.parse(history);
  }
  return [];
};

