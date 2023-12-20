const publicRoute = [
  { path: "/auth/signin", loader: () => import("./auth/signinPage") },
  { path: "/auth/signup", loader: () => import("./auth/signupPage") },
];
const privateRoute = [
  { path: "/auth/profile", loader: () => import("./auth/CheckNumber") },
  { path: "/", loader: () => import("./auth/CheckNumber") },
];
const simpleRoute = [];

export default {
  privateRoute,
  publicRoute,
  simpleRoute,
};
