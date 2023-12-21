import React from "react";

function changePassword() {
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

        <div className="flex items-center justify-center bg-slate-600 cursor-pointer">
          <span className="text-white font-medium p-2 ">Confirmer</span>
        </div>
      </div>
    </div>
  );
}

export default changePassword;
