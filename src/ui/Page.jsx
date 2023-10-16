import Menu from "./Menu";

const Page = ({ children }) => {
  return <>
  <Menu />
  <>{ children }</>
  </>
};

export default Page;