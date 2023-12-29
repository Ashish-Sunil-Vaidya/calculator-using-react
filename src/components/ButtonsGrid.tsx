import calculatorKeys from "../calculator_helpers/calculatorKeys";
import { useAppDispatch } from "../redux/store";
import {
  setInputByButton,
  sendLogToConsole,
  removeLastInput,
  flushInputData,
  flushData,
  calculateResult,
} from "../redux/calculatorSlice";

const ButtonsGrid = () => {
  const dispatch = useAppDispatch();
  
  const handleButtonClick = ({ id, value }: { id: string; value: string }) => {
    switch (id) {
      case "clear":
        dispatch(flushData());
        break;
      case "clear-entry":
        dispatch(flushInputData());
        break;
      case "backspace":
        dispatch(removeLastInput());
        break;
      case "equals":
        dispatch(calculateResult());
        break;
      default:
        dispatch(setInputByButton(value));
        break;
    }
    dispatch(sendLogToConsole());
  };

  return (
    <div className="grid grid-cols-4 grid-rows-6 gap-2">
      {calculatorKeys.map(({ id, value }) => {
        return (
          <button
            key={id}
            value={value}
            className={`size-full transition-colors duration-variable justify-center bg-btn_calc hover:bg-btn_calc_hover text-btn_calc text-2xl rounded-md`}
            onClick={() => handleButtonClick({ id, value })}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
};
export default ButtonsGrid;
