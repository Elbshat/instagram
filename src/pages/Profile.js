import { useState, useEffect } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile/UserProfile";

function Profile() {
  const { username } = useParams();
  const history = useHistory();

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUserExists() {
      const [user] = await getUserByUsername(username);
      if (user) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, history]);

  return user ? (
    <div className=" bg-gray-background">
      <Header />
      <div className=" mx-auto max-w-screen-lg px-6">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}

export default Profile;
