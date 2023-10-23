import { getAccessToken } from "../spotify-auth/auth";

const URL = "https://api.spotify.com/v1";
const headers = {
  Authorization: 'Bearer ' + getAccessToken(),
}

const handleError = async (response, errorMessage) => {
  const error = new Error(errorMessage || 'An error occurred while fetching');
  error.code = response.status;
  error.info = await response.json();
  console.error(errorMessage);
  throw error;
}

const httpWrapper = async (endpoint, errorMessage) => {
  const response = await fetch(`${URL}${endpoint}`, {
    headers: headers
  });
  
  if (!response.ok) {
    console.log(response)
    await handleError(response, errorMessage);
  };

  const data = await response.json();

  console.log(data);
  return data;
}

export default httpWrapper;