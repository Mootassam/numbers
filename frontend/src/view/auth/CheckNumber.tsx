import React, { useEffect, useState } from "react";

function CheckNumber() {
  const [active, setActive] = useState("add");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const SubmitNumber = () => {
    if (!number || number === "0") {
      setError("Write a valid number. Thank you.");
      setShowError(true);

      // Reset showError to false after 3 seconds
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowError(false);
      setError("");
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);

  return (
    <div
      className="flex items-center justify-center h-full w-full bg-slate-300"
      style={{ height: "100dvh" }}
    >
      <div
        className=" relative bg-white p-10 border-r-9 w-[900px] "
        style={{ borderRadius: 7 }}
      >
        <div className="bg-slate-400 items-center  text-center  cursor-pointer absolute flex top-0  w-full justify-between left-0 right-0 m-0 ">
          <div
            style={{ backgroundColor: active === "add" ? "#F321" : "" }}
            className="flex items-center text-center justify-center w-full pt-3 pb-3 pl-6 pr-6"
            onClick={() => setActive("add")}
          >
            <span className="text-white">Add Number</span>
          </div>
          <div
            style={{ backgroundColor: active !== "add" ? "#F321" : "" }}
            className="flex items-center text-center justify-center w-full pt-3 pb-3 pl-6 pr-6"
            onClick={() => setActive("upload")}
          >
            <span className="text-white ">Upload Numbers</span>
          </div>
        </div>

        <div className="pt-10 pb-5">
          {active === "add" && (
            <div className="flex items-start justify-start flex-col">
              <input
                type="text"
                placeholder="Write the number"
                className="w-full pl-3 pr-3 pt-2 pb-2"
                name="number"
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          )}
          {active === "upload" && (
            <div className="">
              <input type="file" name="" id="" />
            </div>
          )}
        </div>

        <div
          className="bg-slate-500 items-center text-center pt-1 pb-1 text-white cursor-pointer"
          onClick={() => SubmitNumber()}
        >
          VALIDER
        </div>
        {showError && (
          <span className="bg-red-500 text-white w-[400px] flex items-center justify-center left-0 right-0 m-auto mt-10 pt-1 pb-1">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}

export default CheckNumber;
