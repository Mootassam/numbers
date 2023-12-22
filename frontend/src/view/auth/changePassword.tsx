import React, { useState } from "react";
import authAxios from "../../modules/shared/axios/authAxios";
import authToken from "../../modules/auth/authToken";

function changePassword() {
  const [oldPassword, setPassword] = useState("");
  const [newpassword, setNewPassowrd] = useState("");
  const changePassword = () => {
    try {
      const data = {
        oldPassword,
        newpassword,
        token: authToken.get(),
      };
      authAxios.post("/changePassword", data);
    } catch (error) {}
  };
  return (
    <div className="flex items-center  h-full w-full bg-slate-300 flex-col justify-center pt-40">
      <div className="flex justify-center flex-col gap-5 max-w-[600px] w-full">
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="text-slate-800 font-medium">
            Write the old password
          </label>
          <input
            type="text"
            placeholder="Write the old Password"
            className="pt-2 pb-2 pl-4"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="" className="text-slate-800 font-medium">
            {" "}
            Write the new password
          </label>
          <input
            type="text"
            placeholder="Write the old Password"
            className="pt-2 pb-2 pl-4"
            onChange={(e) => setNewPassowrd(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="" className="text-slate-800 font-medium">
            {" "}
            Confirm the new password
          </label>
          <input
            type="text"
            placeholder="Write the old Password"
            className="pt-2 pb-2 pl-4"
          />
        </div>

        <div
          className="flex items-center justify-center bg-slate-600 cursor-pointer"
          onClick={() => changePassword()}
        >
          <span className="text-white font-medium p-2 ">Confirmer</span>
        </div>
      </div>
    </div>
  );
}

export default changePassword;
