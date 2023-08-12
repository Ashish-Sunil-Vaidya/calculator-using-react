import "./App.css";
import Buttons from "./Components/Buttons";
import Display from "./Components/Display";
import History from "./Components/History";
import useThemeContext from "./hooks/useThemeContext";

function App() {
  const { theme } = useThemeContext();

  return (
    <div className="calculator" id={theme}>
      <div className="calculator-main">
        <Display />
        <Buttons />
      </div>
      <History />
    </div>
  );
}

export default App;
