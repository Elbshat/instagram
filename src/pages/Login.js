import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
  };
  return (
    <div className="container flex  flex-col-reverse sm:flex-row mx-auto max-w-screen-md items-center sm:h-screen">
      <div className="flex w-3/5">
        <img
          src="./images/iphone-with-profile.jpg"
          alt="iphone with instagram page"
        />
      </div>

      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border rounded mb-4 border-gray-primary">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className=" mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className=" mb-4 text-xs text-red-primary">{error}</p>}

          <form method="POST" onSubmit={handleLogin}>
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email Address"
              className=" text-sm w-full mr-3 py-5 px-4 h-2 mb-2 border rounded text-gray-base border-gray-primary"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="none"
            />
            <input
              aria-label="Enter your Password"
              type="password"
              placeholder="Password"
              className=" text-sm w-full mr-3 py-5 px-4 h-2 mb-2 border rounded text-gray-base border-gray-primary"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="none"
            />

            <button
              type="submit"
              disabled={isInvalid}
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && "opacity-50"
              }`}
            >
              Log In
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border rounded border-gray-primary">
          <p className=" text-sm">
            Don't have an account?{` `}
            <Link to={ROUTES.SIGN_UP} className=" font-bold text-blue-medium">
              Sign up
            </Link>
          </p>
        </div>
        <div className="flex flex-col bg-red-primary p-4">
          <p>Access with </p>
          <p>email: mahmoud2@gmail.com </p>
          <p>password: 123456789 </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
