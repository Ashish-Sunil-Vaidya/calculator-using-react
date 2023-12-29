import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  evaluate,
  isDigit,
  isUnaryOperator,
  isDecimal,
  isOperator,
  createUnaryExpressionString,
  createBinaryExpressionString,
  setHistoryToLocalStorage,
  getHistoryFromLocalStorage,
} from "../calculator_helpers/calculatorHelperFuncs";

export interface History {
  expression: string;
  result: string;
}

export type Severity = "error" | "warning";

export interface MyError {
  message: string;
  severity: Severity;
}

interface CalculatorState {
  inputData: string;
  error: MyError | null;
  expression: string;
  stack: string[];
  history: History[];
}

const initialState: CalculatorState = {
  inputData: "",
  error: null,
  stack: [],
  expression: "",
  history: getHistoryFromLocalStorage(),
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setInputByButton: (state, action: PayloadAction<string>) => {
      state.error = null;
      if (isUnaryOperator(action.payload)) {
        state.error = null;
        if (state.inputData) {
          if (state.stack.length === 1 && state.expression && state.inputData) {
            const { result, error } = evaluate(
              state.inputData,
              null,
              action.payload
            );
            if (result) {
              state.stack.push(String(result));
              state.expression = "";
              state.stack = [];
              state.stack.push(String(result));
              state.history.push({
                expression:
                  state.expression +
                  createUnaryExpressionString(state.inputData, action.payload),
                result: String(result),
              });
              setHistoryToLocalStorage(state.history);
              state.expression = String(result);
              state.inputData = "";
              return;
            } else {
              state.error = error;
            }
          }
          if (state.stack.length === 0) {
            const { result, error } = evaluate(
              state.inputData,
              null,
              action.payload
            );
            if (result) {
              state.stack.push(String(result));

              state.history.push({
                expression:
                  state.expression +
                  createUnaryExpressionString(state.inputData, action.payload),
                result: String(result),
              });
              setHistoryToLocalStorage(state.history);
              state.expression = String(result);
              state.inputData = "";
              return;
            } else {
              state.error = error;
            }
          }

          if (state.stack.length === 1) {
            const { result, error } = evaluate(
              state.inputData,
              null,
              action.payload
            );
            if (result) {
              state.stack.push(String(result));

              state.history.push({
                expression:
                  state.expression +
                  createUnaryExpressionString(state.inputData, action.payload),
                result: String(result),
              });
              setHistoryToLocalStorage(state.history);
              state.expression = String(result);
              state.inputData = "";
            } else {
              state.error = error;
            }
          }

          if (state.stack.length === 2) {
            const { result, error } = evaluate(
              state.inputData,
              null,
              action.payload
            );
            if (result) {
              const operator = state.stack.pop();
              const operand1 = state.stack.pop();
              const operand2 = String(result);
              if (operator && operand1 && operand2) {
                const { result, error } = evaluate(
                  operand1,
                  operand2,
                  operator
                );

                if (result) {
                  state.stack.push(String(result));

                  state.history.push({
                    expression:
                      state.expression +
                      createUnaryExpressionString(
                        state.inputData,
                        action.payload
                      ),
                    result: String(result),
                  });
                  setHistoryToLocalStorage(state.history);
                  state.expression = String(result);
                  state.inputData = "";
                } else {
                  state.error = error;
                }
              }
            } else {
              state.error = error;
            }
          }
        }
        return;
      }
      if (isDigit(action.payload)) {
        state.inputData += action.payload;
        return;
      }
      if (isDecimal(action.payload)) {
        if (state.inputData.includes(".")) {
          return;
        }
        if (!state.inputData) {
          state.inputData = "0.";
          return;
        }
        state.inputData += ".";
        return;
      }
      if (isOperator(action.payload)) {
        if (state.stack.length === 0 && !state.inputData) {
          state.stack.push("0");
          state.stack.push(action.payload);
          state.expression = "0" + action.payload;
          return;
        }

        if (state.stack.length === 0 && state.inputData) {
          state.expression = state.inputData + action.payload;
          state.stack.push(state.inputData);
          state.stack.push(action.payload);
          state.inputData = "";
          return;
        }

        if (state.stack.length === 1) {
          state.stack.push(action.payload);
          state.expression = state.expression + action.payload;
          return;
        }
        if (state.stack.length === 2 && !state.inputData) {
          state.stack.pop();
          state.stack.push(action.payload);
          state.expression = state.expression.slice(0, -1) + action.payload;
          return;
        }

        if (state.stack.length === 2) {
          const operator = state.stack.pop();
          const operand1 = state.stack.pop();
          const operand2 = state.inputData;
          if (operator && operand1 && operand2) {
            const { result, error } = evaluate(operand1, operand2, operator);
            if (error) {
              state.error = error;
              return;
            }
            state.stack.push(result);
            state.stack.push(action.payload);
            state.expression = result + action.payload;
            state.history.push({
              expression: `${operand1}${operator}${operand2}`,
              result,
            });
            setHistoryToLocalStorage(state.history);
            state.inputData = "";
          }
        }
        return;
      }
    },
    setInputByHistory: (state, action: PayloadAction<History>) => {
      if (state.stack.length === 2) {
        state.inputData = action.payload.result;
      } else {
        state.inputData = action.payload.result;
        state.expression = action.payload.expression;
      }
    },

    flushData: (state) => {
      state.inputData = "";
      state.error = null;
      state.stack = [];
      state.expression = "";
    },
    flushInputData: (state) => {
      state.inputData = "";
      state.error = null;
    },
    flushHistory: (state) => {
      state.history = [];
      localStorage.removeItem("history");
    },
    removeLastInput: (state) => {
      state.inputData = state.inputData.slice(0, -1);
    },
    calculateResult: (state) => {
      if (state.stack.length === 1) {
        state.error = {
          message: "Missing operand",
          severity: "warning",
        };
        return;
      }
      if (state.stack.length === 2) {
        const operator = state.stack.pop();
        const operand1 = state.stack.pop();
        const operand2 = state.inputData;
        if (operator && operand1 && operand2) {
          const { result, error } = evaluate(operand1, operand2, operator);
          if (result) {
            state.stack.push(String(result));
            state.expression = String(result);
            state.inputData = "";
            state.history.push({
              expression: createBinaryExpressionString(
                operand1,
                operand2,
                operator
              ),
              result: String(result),
            });
            setHistoryToLocalStorage(state.history);
          } else {
            state.error = error;
          }
        }
      }
    },
    sendLogToConsole: (state) => {
      console.log(`
    inputData: ${state.inputData}
    errorMessage: ${state.error ? state.error.message : "No error"}
    errorSeverity: ${state.error ? state.error.severity : "No error"}
    stack: ${state.stack.toLocaleString()}
    expression: ${state.expression}
    history: ${state.history
      .map((item) => `{ ${item.expression},${item.result} }`)
      .join(",")}
  `);
    },
    setError: (state, action: PayloadAction<MyError>) => {
      state.error = action.payload;
    },
  },
});

export const {
  flushData,
  flushInputData,
  flushHistory,
  removeLastInput,
  sendLogToConsole,
  calculateResult,
  setInputByHistory,
  setInputByButton,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
