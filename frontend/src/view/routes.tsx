const publicRoute = [
  { path: "/auth/signin", loader: () => import("./auth/signinPage") },
  { path: "/auth/signup", loader: () => import("./auth/signupPage") },
];
const privateRoute = [
  { path: "/changepassword", loader: () => import("./auth/changePassword") },
  { path: "/", loader: () => import("./auth/CheckNumber") },
];
const simpleRoute = [
  {
    path: "**",
    loader: () => import("../view/shared/errors/Errors404Page"),
  },
];

export default {
  privateRoute,
  publicRoute,
  simpleRoute,
};
