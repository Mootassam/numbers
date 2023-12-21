import { Route, Switch } from "react-router-dom";
import routes from "../../routes";
import PublicRoute from "./PublicRoute";
import lazyRouter from "../lazyRouter";
import PrivateRoute from "./PrivateRoute";
import authToken from "../../../modules/auth/authToken";
function RoutesComponent() {
  const currentUser = authToken.get();

  return (
    <Switch>
      {routes.publicRoute.map((route) => (
        <PublicRoute
          exact
          key={route.path}
          path={route.path}
          component={lazyRouter({ loader: route.loader })}
          currentUser={currentUser}
        />
      ))}

      {routes.privateRoute.map((route) => (
        <PrivateRoute
          exact
          key={route.path}
          path={route.path}
          component={lazyRouter({ loader: route.loader })}
          currentUser={currentUser}
        />
      ))}

      {routes.simpleRoute.map((route) => (
        <Route
          key={route.path}
          exact
          path={route.path}
          component={lazyRouter({
            loader: route.loader,
          })}
        />
      ))}
    </Switch>
  );
}

export default RoutesComponent;
