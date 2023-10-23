
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../queries/profile";
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
    <>
      { isPending && <Loading />}
      { isError && <ErrorMessage error={error} />}
      { data && <UserData data={data} /> }
    </>
  )
};

export default TopSongs;