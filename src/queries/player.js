import httpWrapper from "./httpWrapper";

const url = "/me/player";

const getPlayerState = async () => {
  const data = await httpWrapper(`${url}`, 'Error while fetching user player state');
  return data?.devices || [];
}

const getUserDevices = async () => {
  const data = await httpWrapper(`${url}/devices`, 'Error while fetching user devices');
  return data?.devices || [];
}

export { getPlayerState, getUserDevices };