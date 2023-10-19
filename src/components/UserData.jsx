import { useMemo } from "react";

import styles from './UserData.module.scss';

const UserData = ({ data }) => {

  const profilePic = useMemo(() => {
    return data.images && data.images.length > 1 ? data.images[1].url : data.images[0].url
  }, [data.images]);

  console.log(profilePic)

  return <>
    <div className={styles.userData}>
      <div className={styles.userData}>
        { data.display_name }
      </div>
      <div 
        className={styles['userData--profilePic']}
        style={{'backgroundImage': `url(` + profilePic + `)`}}></div>
    </div>
  </>
};

export default UserData;