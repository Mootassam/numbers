import React, { useEffect, useState } from "react";
import authAxios from "../../modules/shared/axios/authAxios";
import authToken from "../../modules/auth/authToken";
import InputFormItem from "../shared/form/items/InputFormItem";
import Message from "../shared/message";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const changePassword = async () => {
    try {
      setErrorMessages({}); // Reset error messages

      // Validation checks
      if (!oldPassword) {
        setErrorMessages({ oldPassword: "Old Password is required" });
        return;
      }

      if (!newPassword) {
        setErrorMessages({ newPassword: "New Password is required" });
        return;
      }

      if (newPassword !== confirmPassword) {
        setErrorMessages({ confirmPassword: "Passwords do not match" });
        return;
      }

      const data = {
        oldPassword,
        newpassword: newPassword,
        token: authToken.get(),
      };

      await authAxios
        .post("/changePassword", data)
        .then((res) => {
          Message.success("Success Change the Password");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        })
        .catch((error) => {
          Message.error(error.response.data);
        });
    } catch (error) {
      // Handle error
      Message.error(`Error changing password:, ${error}`);
    }
  };
  useEffect(() => {}, [oldPassword, newPassword, confirmPassword]);

  return (
    <div className="flex items-center h-full w-full bg-slate-300 flex-col justify-center pt-40">
      <div className="flex justify-center flex-col gap-5 max-w-[600px] w-full">
        <InputFormItem
          name="oldPassword"
          type="password"
          placeholder="Write the old password"
          label="Old Password"
          value={oldPassword}
          onChange={(value) => setOldPassword(value)}
          errorMessage={errorMessages.oldPassword}
        />

        <InputFormItem
          name="newPassword"
          type="password"
          placeholder="Write the new password"
          label="New Password"
          value={newPassword}
          onChange={(value) => setNewPassword(value)}
          errorMessage={errorMessages.newPassword}
        />

        <InputFormItem
          name="confirmPassword"
          type="password"
          placeholder="Confirm the new password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(value) => setConfirmPassword(value)}
          errorMessage={errorMessages.confirmPassword}
        />

        <div
          className="flex items-center justify-center bg-slate-600 cursor-pointer"
          onClick={() => changePassword()}
        >
          <span className="text-white font-medium p-2">Confirmer</span>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
