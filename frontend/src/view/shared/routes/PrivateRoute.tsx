import { Route } from "react-router-dom";
import Layout from "../../../view/layout/Layout";

function PrivateRoute({ path, component: Component, currentUser, ...reset }) {
  return (
    <Route
      {...reset}
      render={(props) => {
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
