import "../Components/Display.css";

import { FaBackspace, FaClock } from "react-icons/fa";
import ChangeTheme from "./ChangeTheme";
import useInputContext from "../hooks/useInputContext";
import useThemeContext from "../hooks/useThemeContext";

export default function Display() {
  const { ref, expression, setExpression, showEquation, setCursorPosition } =
    useInputContext();

  const { setIsOpen } = useThemeContext();

  const clear = () => {
    setExpression((expn) => {
      return String(expn).slice(0, -1);
    });
  };

  const handleInput = (e) => {
    if (ref.current) {
      const newExpression = e.target.value;
      setExpression(newExpression);
      setCursorPosition(ref.current.selectionStart);
    }
  };

  return (
    <div className="calculator-display">
      <button className="display-settings">
        <ChangeTheme />
      </button>
      <div className="display-expression">{showEquation}</div>
      <input
        className="display-input"
        contentEditable={document.body.clientWidth < 768 ? false : true}
        onInput={handleInput}
        ref={ref}
        value={expression}
      />

      <div className="display-utility">
        <FaClock
          className="utility-history"
          onClick={() =>
            setIsOpen((prevState) => {
              return !prevState;
            })
          }
        />
        <FaBackspace
          title="Press BackSpace"
          className="utility-clear"
          onClick={clear}
        />
      </div>
    </div>
  );
}
