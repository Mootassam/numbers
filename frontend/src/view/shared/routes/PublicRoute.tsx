import { Redirect, Route } from "react-router-dom";
import PermissionChecker from "../../../modules/auth/permissionChecker";

function PublicRoute({ path, component: Component, currentUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const checkPermission = new PermissionChecker(currentUser);
        console.log(checkPermission.currentUser);

        if (checkPermission.isAuthenticated) {
          return <Redirect to="/" />;
        }

        return <Component {...props} />;
      }}
    />
  );
}

export default PublicRoute;
