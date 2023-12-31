import { redirect } from "react-router-dom";

const client_id = process.env.REACT_APP_CLIENT_ID;

const redirect_uri = 'http://localhost:3000/login';

const SCOPE = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state"
].join(" ");

console.log(SCOPE)

const getAccessToken = () => localStorage.getItem('access_token') || null;
const getRefreshToken = () => localStorage.getItem('refresh_token') || null;
const getExpiresAt = () => localStorage.getItem('expires_at') || null;

const checkIsAuth = () => {
  if (getAccessToken() && getRefreshToken()) {
    // if user is signed in
    
    if(getExpiresAt() <= new Date()){
      // user session has expired
      logout();
      return false;
    }
    else{
      return true;
    }
  }
  else {
    return false;
  }
}

const routeGuard = () => {
  const isLogged = checkIsAuth();
  if(!isLogged) {
    return redirect('/login')
  }
  else return null;
}

function generateRandomString(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(digest);
}

function generateUrlWithSearchParams(url, params) {
  const urlObject = new URL(url);
  urlObject.search = new URLSearchParams(params).toString();

  return urlObject.toString();
}

function redirectToSpotifyAuthorizeEndpoint() {
  const codeVerifier = generateRandomString(64);

  generateCodeChallenge(codeVerifier).then((code_challenge) => {
    window.localStorage.setItem('code_verifier', codeVerifier);

    window.location = generateUrlWithSearchParams(
      'https://accounts.spotify.com/authorize',
      {
        response_type: 'code',
        client_id,
        scope: SCOPE,
        code_challenge_method: 'S256',
        code_challenge,
        redirect_uri,
      },
    );

    // If the user accepts spotify will come back to your application with the code in the response query string
    // Example: http://127.0.0.1:8080/?code=NApCCg..BkWtQ&state=profile%2Factivity
  });
}

function exchangeToken(code) {
  const code_verifier = localStorage.getItem('code_verifier');
  console.log('fetch')

  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id,
      grant_type: 'authorization_code',
      code,
      redirect_uri,
      code_verifier,
    }),
  })
    .then(addThrowErrorToFetch)
    .then((data) => {
      processTokenResponse(data);

      // clear search query params in the url
      window.history.replaceState({}, document.title, '/login');
    })
    .catch(handleError);
}

function refreshToken() {
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: new URLSearchParams({
      client_id,
      grant_type: 'refresh_token',
      getRefreshToken,
    }),
  })
    .then(addThrowErrorToFetch)
    .then(processTokenResponse)
    .catch(handleError);
}

function handleError(error) {
  console.error(error);
}

async function addThrowErrorToFetch(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw { response, error: await response.json() };
  }
}

function logout() {
  localStorage.clear();
  console.log('reload')
  window.location.reload();
}

function processTokenResponse(data) {
  const t = new Date();
  let expires_at = t.setSeconds(t.getSeconds() + data.expires_in);

  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.access_token);
  localStorage.setItem('expires_at', expires_at);
}

export { 
  generateCodeChallenge, 
  generateRandomString, 
  redirectToSpotifyAuthorizeEndpoint, 
  exchangeToken, 
  refreshToken, 
  logout, 
  getAccessToken, 
  getRefreshToken, 
  getExpiresAt,
  checkIsAuth,
  routeGuard
}