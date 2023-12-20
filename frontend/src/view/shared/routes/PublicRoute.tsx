import { Redirect, Route } from "react-router-dom";
import PermissionChecker from "../../../modules/auth/permissionChecker";

function PublicRoute({ path, component: Component, currentUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const checkPermission = new PermissionChecker(currentUser);

        if (checkPermission.isAuthenticated) {
          return <Redirect path="/" />;
        }

        return <Component {...props} />;
      }}
    />
  );
}

export default PublicRoute;
