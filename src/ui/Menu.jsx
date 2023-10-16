import { logout } from "../spotify-auth/auth";

const Menu = () => {

  const onLogout = () => {
    logout();
  }

  return <>
    <button onClick={onLogout}>Log out</button>
  </>
};

export default Menu;