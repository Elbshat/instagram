import { useContext } from "react";

import User from "./User";
import Suggestions from "./Suggestions";
import LoggedInUserContext from "../../context/LoggedInUser";

function Sidebar() {
  const { user: { fullName, username, userId, following, docId = "" } = {} } =
    useContext(LoggedInUserContext);

  return (
    <div className=" p-4 order-1 sm:order-2">
      <User username={username} fullName={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
}

export default Sidebar;
