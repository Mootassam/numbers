import { useState } from "react";
import AuthService from "../../modules/auth/authService";
import authToken from "../../modules/auth/authToken";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const token = await AuthService.signinWithEmailAndPassword(email, password);

    if (token) {
      authToken.set(token);
      location.reload()
    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex items-center justify-center  bg-[#f1f7fe] p-20 mt-20 max-w-[600px] w-full">
        <form
          className="flex items-start justify-center flex-col gap-[20px]"
          onSubmit={submit}
        >
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="email" className="flex font-medium">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium flexF" >Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              className="bg-[#3f3f3f3f] pb-[5px] px-[10px] max-w-[300px] w-full"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigninPage;
