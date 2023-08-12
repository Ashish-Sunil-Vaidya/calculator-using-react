import "../Components/Buttons.css";
import useInputContext from "../hooks/useInputContext";
export default function Buttons() {
  const { handleInput } = useInputContext();

  
  const buttonsList = [
    "C",
    "(",
    ")",
    "/",
    "1",
    "2",
    "3",
    "*",
    "4",
    "5",
    "6",
    "-",
    "7",
    "8",
    "9",
    "+",
    "%",
    "0",
    ".",
    "=",
  ].map((key) => (
    <button
      className="buttons-button"
      key={key}
      onClick={() => handleInput(key)}
    >
      {key}
    </button>
  ));

  return <div className="buttons-container">{buttonsList}</div>;
}
