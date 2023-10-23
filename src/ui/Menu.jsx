import { useContext } from "react";
import { logout } from "../spotify-auth/auth";
import { AppContext } from "../context/context";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Logout,  Favorite, WbSunny } from "@mui/icons-material";

const Menu = () => {

  const { setDarkTheme } = useContext(AppContext);

  const onLogout = () => {
    logout();
  }

  const onThemeChange = () => {
    setDarkTheme((t) => !t)
  }

  return <>
    <BottomNavigation
      showLabels
      value={'home'}
    >
      <BottomNavigationAction label="Favorites" icon={<Favorite />} />
      <BottomNavigationAction label="Switch theme" icon={<WbSunny />} onClick={onThemeChange}/>
      <BottomNavigationAction label="Log out" icon={<Logout />} onClick={onLogout}/>
    </BottomNavigation>
  </>
};

export default Menu;