import { useContext } from "react";
import { logout } from "../spotify-auth/auth";
import { AppContext } from "../context/context";
import { BottomNavigation, BottomNavigationAction, Button } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import Logout from "@mui/icons-material/Logout";
import { WbSunny } from "@mui/icons-material";

const Menu = () => {

  const { setDarkTheme } = useContext(AppContext);

  const onLogout = () => {
    logout();
  }

  const onThemeChange = () => {
    setDarkTheme((t) => !t)
  }

  return <>
    {/* <Button onClick={onThemeChange}>Switch theme</Button>
    <Button onClick={onLogout}>Log out</Button> */}
    <BottomNavigation
      showLabels
      value={'home'}
      onChange={(event, newValue) => {
        console.log('e')
      }}
    >
      <BottomNavigationAction label="Favorites" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Switch theme" icon={<WbSunny />} onClick={onThemeChange}/>
      <BottomNavigationAction label="Log out" icon={<Logout />} onClick={onLogout}/>
    </BottomNavigation>
  </>
};

export default Menu;