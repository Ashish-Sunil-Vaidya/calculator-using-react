import Switch from "react-switch";
import {FaMoon,FaSun} from "react-icons/fa";
import "../Components/Display.css";
import useThemeContext from "../hooks/useThemeContext";

export default function ChangeTheme() {

  const { theme, setTheme } = useThemeContext();
  const changeTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === "dark" ? "light" : "dark";
    });
  };
  return (
    <Switch
      className="theme-changer"
      width={65}
      height={35}
      handleDiameter={25}
      onHandleColor="#FFFFFF"
      onColor="#199c12"
      checkedIcon={
        <div className="dark-icon">
          <FaMoon className="moon" />
        </div>
      }
      offHandleColor="#FFFFFF"
      offColor="#199c12"
      uncheckedIcon={
        <div className="light-icon">
          <FaSun className="sun" />
        </div>
      }
      onChange={changeTheme}
      checked={theme === "dark"}
    />
  );
}
