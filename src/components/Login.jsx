import { useContext, useEffect } from "react";
import { exchangeToken, getAccessToken, getExpiresAt, getRefreshToken, logout, redirectToSpotifyAuthorizeEndpoint } from "../spotify-auth/auth";
import Page from "../ui/Page";
import { getUserData } from "../queries/profile";
import { AppContext } from "../context/context";

const Login = () => {

  const { isLogged, setIsLogged } = useContext(AppContext);
  const args = new URLSearchParams(window.location.search);
  const code = args.get('code');

  const fetchUserData = () => {
    console.log('yay', getAccessToken(), getRefreshToken());
    getUserData();
  }

  useEffect(() => {
    if (code) {
      // we have received the code from spotify and will exchange it for a access_token
      exchangeToken(code);
      setIsLogged(true);
    }
    else if (getAccessToken() && getRefreshToken()) {
      // if user is signed in

      if(getExpiresAt() <= new Date()){
        // user session has expired
        logout();
        setIsLogged(false);
      }
      else{
        // user session is still valid
        setIsLogged(true);
        fetchUserData();
      }
    }
    else {
      // no code and no access token means the user hasn't tried to logged in yet
      setIsLogged(false);
    }
  }, [code, setIsLogged])

  const onLoginClicked = () => {
    redirectToSpotifyAuthorizeEndpoint();
  };

  return (
    <Page>
      <h1>Login</h1>
      {!isLogged && <button onClick={onLoginClicked}>Login with Spotify</button>}
    </Page>
  );
};

export default Login;