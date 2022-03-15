import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/User";
import useAuthListener from "./hooks/useAuthListener";

import ProtectedRoute from "./helpers/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading....</p>}>
          <Switch>
            <Route exact path={ROUTES.SIGN_UP} component={Signup} />
            <Route exact path={ROUTES.LOGIN} component={Login} />
            <Route exact path={ROUTES.PROFILE} component={Profile} />
            <ProtectedRoute user={user} exact path={ROUTES.DASHBOARD}>
              <Dashboard />
            </ProtectedRoute>

            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
