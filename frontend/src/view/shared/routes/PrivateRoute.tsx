import { Redirect, Route, useLocation } from "react-router-dom";
import Layout from "../../../view/layout/Layout";
import PermissionChecker from "../../../modules/auth/permissionChecker";

function PrivateRoute({ path, component: Component, currentUser, ...reset }) {
  const location = useLocation();
  return (
    <Route
      {...reset}
      render={(props) => {
        const checkPermission = new PermissionChecker(currentUser);
        if (!checkPermission.isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: "/auth/signin",
                state: { from: location },
              }}
            />
          );
        }
        return (
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
}

export default PrivateRoute;
