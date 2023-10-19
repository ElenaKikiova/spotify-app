import { useContext } from "react";
import { logout } from "../spotify-auth/auth";
import { AppContext } from "../context/context";

const Menu = () => {

  const { setDarkTheme } = useContext(AppContext);

  const onLogout = () => {
    logout();
  }

  const onThemeChange = () => {
    setDarkTheme((t) => !t)
  }

  return <>
    <button onClick={onThemeChange}>Switch theme</button>
    <button onClick={onLogout}>Log out</button>
  </>
};

export default Menu;