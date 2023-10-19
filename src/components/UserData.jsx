import { useMemo } from "react";

const UserData = ({ data }) => {

  const profilePic = useMemo(() => {
    return data.images && data.images.length > 1 ? data.images[1].url : data.images[0].url
  }, [data.images])

  return <>
    <div>
      <div>{ data.display_name }</div>
      <div style={{'backgroundImage': profilePic}}></div>
    </div>
  </>
};

export default UserData;