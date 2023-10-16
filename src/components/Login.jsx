import { useEffect, useState } from "react";
import { exchangeToken, generateCodeChallenge, getAccessToken, getExpiresAt, getRefreshToken, redirectToSpotifyAuthorizeEndpoint } from "../spotify-auth/auth";
import Page from "../ui/Page";
import { getUserData } from "../queries/profile";

const Login = () => {

  const [isLogged, setIsLogged] = useState(false);
  const args = new URLSearchParams(window.location.search);
  const code = args.get('code');

  useEffect(() => {
  
    if (code) {
      // we have received the code from spotify and will exchange it for a access_token
      exchangeToken(code);
    } else if (getAccessToken() && getRefreshToken() && getExpiresAt()) {
      
      setIsLogged(true);
      fetchUserData();
    } else {
      setIsLogged(false);
    }
  }, [code])

  const onLoginClicked = () => {
    console.log(localStorage.get)
    redirectToSpotifyAuthorizeEndpoint();
  };

  const fetchUserData = () => {
    console.log('yay', getAccessToken(), getRefreshToken());
    getUserData();
  }

  return <Page>
    <h1>Login</h1>
    {!isLogged && <button onClick={onLoginClicked}>Login with Spotify</button>}
    
  </Page>
};

export default Login;