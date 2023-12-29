import { FaCircle } from "react-icons/fa6";
import ActionButton from "./ActionButton";
import { useState } from "react";
import ReactSwitch from "react-switch";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  toggleTheme,
  changeAccent,
  accentColors,
  changeAnimationSpeed,
  AnimClass,
} from "../redux/themeSlice";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Drawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openStyles = drawerOpen ? "w-full sm:w-[500px]" : "w-0";
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const accentColor = useAppSelector((state) => state.theme.accent);
  const animationSpeed = useAppSelector(
    (state) => state.theme.animationSpeedClass
  );

  const handleAnimationSpeedChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const animationSpeed = event.target.value as AnimClass;
    dispatch(changeAnimationSpeed(animationSpeed));
  };

  return (
    <>
      <ActionButton
        Icon={FaBars}
        actionFunc={() => {
          setDrawerOpen(!drawerOpen);
        }}
        styles={
          "m-2 fixed z-20 text-btn_toggle hover:bg-btn_history_hover transition-colors duration-variable"
        }
      />
      <div
        className={`fixed z-30 md:relative flex  flex-col overflow-x-hidden items-center h-full bg-primary transform ${openStyles} transition-all duration-variable ease-in-out text-primary`}
      >
        <ActionButton
          Icon={FaX}
          actionFunc={() => {
            setDrawerOpen(!drawerOpen);
          }}
          styles={
            "m-2 z-40 self-end text-btn_toggle hover:bg-btn_history_hover transition-colors duration-variable"
          }
        />
        <h3 className=" font-bold py-3">Settings</h3>
        <div className="flex flex-1 flex-col p-10">
          <div className="flex items-center gap-3">
            <span>Theme:</span>
            <ReactSwitch
              onChange={() => dispatch(toggleTheme())}
              checked={theme === "light"}
              checkedIcon={
                <FaSun className=" h-full w-full p-1 text-orange-600" />
              }
              uncheckedIcon={
                <FaMoon className="h-full w-full p-1 text-purple-600" />
              }
              onColor="#FFFF00"
              offColor="#242424"
              className="react-switch"
              id="material-switch"
            />
          </div>
          <div className="mt-3">
            <span>Accent Color</span>
            <div className="flex">
              {accentColors.map(({ accent, color }, index: number) => (
                <ActionButton
                  id={index}
                  key={index}
                  Icon={FaCircle}
                  iconColor={color}
                  actionFunc={() => dispatch(changeAccent(accent))}
                  styles={`m-2 text-[${color}] hover:bg-btn_toggle_hover ${
                    accent === accentColor ? "bg-btn_toggle_hover" : ""
                  } border-[2px]`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span>Animation Speed:</span>
            <select
              value={animationSpeed}
              onChange={handleAnimationSpeedChange}
              className="bg-primary transition-colors duration-variable text-primary border-primary border-2 rounded-md p-1"
            >
              <option value={"a0"}>0</option>
              <option value={"a05"}>0.5</option>
              <option value={"a1"}>1</option>
              <option value={"a15"}>1.5</option>
              <option value={"a2"}>2</option>
              <option value={"a25"}>2.5</option>
              <option value={"a3"}>3</option>
            </select>
          </div>
        </div>
        <footer className="bg-secondary m-3 p-3 rounded-md text-sm">Made with ❤️ by Ashish Vaidya(Calm Person)</footer>
      </div>
    </>
  );
};
export default Drawer;
