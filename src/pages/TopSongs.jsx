
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../queries/profile";
import Page from "../ui/Page";
import Loading from "../ui/Loading";
import UserData from "../components/UserData";
import ErrorMessage from "../ui/ErrorMessage";

const TopSongs = () => {
  
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['user-data'],
    queryFn: getUserData
  });

  console.log(data, isPending, isError, error)

  return (
    <Page>
      { isPending && <Loading />}
      { isError && <ErrorMessage error={error} />}
      { data && <UserData data={data} /> }
    </Page>
  )
};

export default TopSongs;