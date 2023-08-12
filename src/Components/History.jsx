/* eslint-disable react/prop-types */
import "../Components/History.css";
import { FaTrash } from "react-icons/fa";
import useInputContext from "../hooks/useInputContext";
import useThemeContext from "../hooks/useThemeContext";

export default function History() {
  const { historyArr, setHistory } = useInputContext();
  const { isOpen, setIsOpen } = useThemeContext();

  const clearHistory = () => {
    setHistory((prev) => {
      localStorage.removeItem("user", JSON.stringify(prev))
      return [];
    });
  };

  const changeToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div
      className="calculator-history"
      style={
        document.body.offsetWidth < 768
          ? {
              transform: isOpen ? "translate(-100%,40%)" : "translate(0%,40%)",
              transition: "transform 0.3s ease-in-out",
            }
          : null
      }
    >
      <div className="history-label">
        <span className="label">History</span>
        <div
          title="Press ctrl + d"
          className="clear-history"
          onClick={() => {
            clearHistory();
            changeToggle();
          }}
        >
          <FaTrash />
        </div>
      </div>

      <div className="history-content">
        <div className="history">
          {historyArr.length !== 0 ? (
            historyArr
          ) : (
            <span className="content-empty">There&apos;s no history yet</span>
          )}
        </div>
        <div style={{ display: "grid" }}>
          <button
            className="clear-history-mobile"
            onClick={() => {
              clearHistory();
              changeToggle();
            }}
          >
            clear history
          </button>
        </div>
      </div>
    </div>
  );
}
