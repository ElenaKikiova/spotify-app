import httpWrapper from "./httpWrapper";

const getUserData = async () => {
  const data = await httpWrapper('/me', 'Error while fetching user info');
  return data;
}

export { getUserData };