interface CalculatorKeys {
  value: string;
  id: string;
}

const calculatorKeys: CalculatorKeys[] = [
  { value: "%", id: "percent" },
  { value: "CE", id: "clear-entry" },
  { value: "C", id: "clear" },
  { value: "⌫", id: "backspace" },
  { value: "1/x", id: "reciprocal" },
  { value: "x²", id: "square" },
  { value: "√", id: "square-root" },
  { value: "/", id: "divide" },
  { value: "7", id: "seven" },
  { value: "8", id: "eight" },
  { value: "9", id: "nine" },
  { value: "×", id: "multiply" },
  { value: "4", id: "four" },
  { value: "5", id: "five" },
  { value: "6", id: "six" },
  { value: "-", id: "subtract" },
  { value: "1", id: "one" },
  { value: "2", id: "two" },
  { value: "3", id: "three" },
  { value: "+", id: "add" },
  { value: "±", id: "negate" },
  { value: "0", id: "zero" },
  { value: ".", id: "decimal" },
  { value: "=", id: "equals" },
];

export default calculatorKeys;
