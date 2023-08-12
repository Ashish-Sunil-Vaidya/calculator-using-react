import { createContext, useState,useRef } from "react";

export const InputDataContext = createContext();
import { create, all } from "mathjs";
const config = {};
const math = create(all, config);

// eslint-disable-next-line react/prop-types
const InputDataContextProvider = ({children}) => {
  const [expression, setExpression] = useState("");
  const ref = useRef(null);
  const [showEquation, setShowEquation] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [historyList, setHistory] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : []);
  const handleInput = (input) =>{ 
    console.log("inside handleInput");

    if (input === "C") {
      setExpression("");
      setShowEquation("");
    } else if (input === "=") {
      try {
        const output = math.evaluate(expression);
        if ([Infinity, -Infinity].includes(output)) throw new Error();
        if (isNaN(output) || typeof output === "undefined") throw new Error();
        setExpression(output.toString());
        setShowEquation(expression);
        setHistory((prev) => {
          localStorage.setItem("user", JSON.stringify([...prev, { id: Date.now(), expn: expression, ans: output }]));
          return [...prev, { id: Date.now(), expn: expression, ans: output }];
        });
      } catch {
        alert("Error");
      }
    } else {
      const inputField = ref.current;
    if (!inputField) return;

    const startPos = inputField.selectionStart;
    const endPos = inputField.selectionEnd;

    setExpression((prevExpression) => {
      const newExpression =
        prevExpression.slice(0, startPos) +
        input +
        prevExpression.slice(endPos);

      inputField.focus();
      inputField.setSelectionRange(
        startPos + input.length,
        startPos + input.length
      );

      return newExpression;
    });
      }
    
  };

  const historyArr = historyList
    .sort((a, b) => b.id - a.id)
    .map((item) => {
      return (
        <div className="history-item" key={item.id}>
          <button
            className="set-expression"
            onClick={() => {
              setExpression((prev) => {
                return String(prev).concat(item.expn);
              });
            }}
          >
            {item.expn}
          </button>
          <button
            className="set-expression"
            onClick={() => {
              setExpression((prev) => {
                return String(prev).concat(item.ans);
              });
            }}
          >
            {item.ans}
          </button>
        </div>
      );
    });

  const values = {
    ref,
    expression,
    setExpression,
    showEquation,
    setShowEquation,
    historyArr,
    setHistory,
    handleInput,
    cursorPosition,
    setCursorPosition,
  };

  return (
    <InputDataContext.Provider value={values}>
      {children}
    </InputDataContext.Provider>
  );
};

export default InputDataContextProvider;
