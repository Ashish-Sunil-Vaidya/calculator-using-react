import ButtonsGrid from "./components/ButtonsGrid";
import DisplayConatiner from "./components/DisplayContainer";
import Drawer from "./components/Drawer";
import HistoryContainer from "./components/HistoryContainer";
import ActionButton from "./components/ActionButton";
import { useAppSelector } from "./redux/store";
import { FaHistory } from "react-icons/fa";
import { useState } from "react";
import {AnimatePresence } from "framer-motion";

const App = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const accentColor = useAppSelector((state) => state.theme.accent);
  const themeClass = theme === "light" ? "" : "theme-dark";
  const animationSpeed = useAppSelector(
    (state) => state.theme.animationSpeedClass
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openStyles = drawerOpen ? "h-[70%]" : "h-0";

  return (
    <div
      className={`${themeClass} ${accentColor} ${animationSpeed} w-[100svw] h-[100svh] flex`}
    >
      <Drawer />
      <div
        className={`size-full grid sm:grid-cols-[70%,30%] p-2 bg-primary text-primary transition-colors duration-variable `}
      >
        <div className="h-full grid grid-rows-[22%,8%,70%] sm:grid-rows-[30%,70%] ">
          <DisplayConatiner />
          <ActionButton
            Icon={FaHistory}
            actionFunc={() => setDrawerOpen(!drawerOpen)}
            styles="self-center sm:hidden text-btn_toggle bg-btn_history_hover"
          />
          <ButtonsGrid />
        </div>

        <AnimatePresence>
          <div
            className={`fixed bottom-0 left-0 rounded-md sm:pr-0 ${openStyles} bg-secondary sm:bg-primary w-full sm:relative sm:h-full flex flex-col overflow-hidden sm:overflow-y-auto transition-all duration-variable`}
          >
            <HistoryContainer />
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};
export default App;
