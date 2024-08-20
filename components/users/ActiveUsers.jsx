import React, { useMemo } from "react";
import { Avatar } from "./Avatar";
import { useOthers, useSelf } from "@liveblocks/react";
import styles from "./index.module.css";
import { generateRandomName } from "@/lib/utils";

const ActiveUsers = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  const memoUser = useMemo(() => {
    return (
      <div className="flex justify-center items-center ">
        <div className="flex pl-3 ">
          {console.log("current user : " + currentUser)}
          {console.log("all user : " + users)}
          {currentUser && (
            <Avatar
              name="You"
              otherStyles="border-[3px] border-primary-green "
            />
          )}
          {users.slice(0, 3).map(({ connectionId, info }) => {
            return (
              <Avatar
                key={connectionId}
                name={generateRandomName()}
                otherStyles="-ml-3"
              />
            );
          })}
          {hasMoreUsers && (
            <div className={styles.more}>+{users.length - 3}</div>
          )}
        </div>
      </div>
    );
  }, [users.length]);
  return memoUser;
};

export default ActiveUsers;
