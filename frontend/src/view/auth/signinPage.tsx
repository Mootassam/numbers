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
    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center">
      <form
        className="flex items-start justify-center flex-col gap-[20px]"
        onSubmit={submit}
      >
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="border-blue-50"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button className="bg-[#3f3f3f3f] py-[5px] px-[10px]" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SigninPage;
