import { useState } from "react";
import AuthService from "../../modules/auth/authService";
import authToken from "../../modules/auth/authToken";
import authAxios from "../../modules/shared/axios/authAxios";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      setShowError(true);
      setError("Please fill all this informations");
      return;
    }

    setLoading(true);

    // Prevent the default form submission behavior
    const token = await authAxios
      .post("/auth/signin", {
        email,
        password,
      })
      .then((res) => {
        if (res) {
          authToken.set(res);
          location.reload();
        }
      })
      .catch((error) => {
        setShowError(true);
        setError(error.response.data);
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <div className="flex w-full h-full items-center justify-center ">
      <div className="flex flex-col items-center justify-center  bg-[#f1f7fe] p-20 mt-20 max-w-[600px] w-full">
        <form
          className="flex items-start justify-center flex-col gap-[20px] w-full"
          onSubmit={submit}
        >
          <div className="flex flex-col gap-[10px] w-full gap-3">
            <label htmlFor="email" className="flex font-medium">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full gap-3">
            <label htmlFor="password" className="font-medium flexF">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full">
            <button
              className="bg-[#3f3f3f3f] pt-[7px] pb-[7px] px-[10px]  w-full p-2 flex items-center justify-center gap-3"
              type="submit"
            >
              <span> Login</span>
              {loading  && <div className="spinner"></div>}
            </button>
          </div>
        </form>

        {showError && (
          <span className="bg-red-500 text-white  flex items-center justify-center left-0 right-0 m-auto mt-10 pt-1 pb-1 w-full">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}

export default SigninPage;
