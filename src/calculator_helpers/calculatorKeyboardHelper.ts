import {
  setInputByButton,
  calculateResult,
  flushData,
  removeLastInput,
} from "../redux/calculatorSlice";

import { AppDispatch } from "../redux/store";

const handleKeyboardInput = (
  e: React.KeyboardEvent<HTMLInputElement>,
  dispatch: AppDispatch
) => {
  const { key } = e;
  // console.log("handleKeyboardInput", key);
  switch (key) {
    case "Enter":
      dispatch(calculateResult());
      break;
    case "Backspace":
      dispatch(removeLastInput());
      break;
    case "Escape":
      dispatch(flushData());
      break;
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "+":
    case "-":
    case "/":
    case "%":
    case ".":
      dispatch(setInputByButton(key));
      break;
    case "*":
      dispatch(setInputByButton("×"));
      break;
    default:
      break;
  }
};

export default handleKeyboardInput;
