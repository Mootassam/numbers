import { Route } from "react-router-dom";

function PrivateRoute({ path, component: Component, currentUser, ...reset }) {
  return (
    <Route
      {...reset}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
