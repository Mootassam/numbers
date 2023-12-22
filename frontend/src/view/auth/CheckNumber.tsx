import axios from "axios";
import React, { useEffect, useState } from "react";
import authAxios from "../../modules/shared/axios/authAxios";
import ListNumberDuplicate from "./ListNumberDuplicate";

function CheckNumber() {
  const [active, setActive] = useState("add");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);

  const [duplicate, setDuplicate] = useState(0);
  const [newnumber, setnewNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listduplicate, setListDuplicate] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    // Check if a file is selected
    if (!file) {
      setError("No file selected");
      setShowError(true);
      return;
    }

    // Check if the file type is CSV
    if (file?.type !== "text/csv") {
      setShowError(true);
      setError("Invalid file type. Please select a CSV file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await authAxios
        .post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .catch((error) => {
          setError(error.response.data), setShowError(true);
        });
      setnewNumber(response?.data?.newNumber);
      setDuplicate(response?.data?.duplicateNumber);
      setListDuplicate(response?.data?.arrayDuplicateNumber);
      setFile(null); // Reset the file input
      setNumber("");
      setSuccess(true);
      // Handle the response as needed (e.g., show success message)
      console.log("File uploaded successfully:", response?.data);
    } catch (error) {
      console.error("Error uploading file:", error);

      // Rethrow the error or handle it further
      throw error;
    }
  };

  const SubmitNumber = () => {
    if (!number || number === "0") {
      setError("Write a valid number. Thank you.");
      setShowError(true);
      // Reset showError to false after 3 seconds
    } else {
      const payload = authAxios
        .post("/check/addNumber", { number: number })
        .then((res) => setnewNumber(1))
        .catch((error) => {
          setError(error.response.data), setShowError(true);
          setnewNumber(0);
          setDuplicate(1);
        });
    }
  };

  const ActiveTab = (item) => {
    setActive(item);
    setnewNumber(0);
    setDuplicate(0);
    setShowError(false);
    setListDuplicate();
  };

  const downloadCSV = () => {
    // Create a CSV content
    const csvContent = "phone_Numbers";

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Create a download link
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "data.csv";

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger the click event to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  const handleNumericInputChange = (e) => {
    const inputValue = e.target.value;
    const isValidInput = /^(\+|-)?\d*$/g.test(inputValue);
    if (isValidInput) {
      setNumber(inputValue);
    } else {
      setShowError(true);
      setError(
        "Please enter a valid numeric value (only digits and '+' allowed)."
      );
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowError(false);
      setSuccess(false);
      setError("");
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error, file, duplicate, newnumber]);

  return (
    <div className="flex items-center  h-full w-full flex-col relative">
      <div className="flex justify-between  w-full max-w-[900px] mb-10 gap-8 mt-14 ">
        <div className="p-10 bg-neutral-700 text-yellow-50 flex items-center justify-center flex-col w-full">
          <span className="text-[50px]">{newnumber}</span>
          <label htmlFor="" className="text-lg">
            Number added
          </label>
        </div>
        <div className="p-10 bg-neutral-700 text-yellow-50 flex items-center justify-center flex-col w-full">
          <span className="text-[50px]"> {duplicate}</span>
          <label htmlFor="" className="text-lg">
            Numbers Duplicated
          </label>
        </div>
      </div>
      <div
        className=" relative bg-white p-10 border-r-9  w-full max-w-[900px] "
        style={{ borderRadius: 7 }}
      >
        <div className="bg-slate-400 items-center  text-center  cursor-pointer absolute flex top-0  w-full justify-between left-0 right-0 m-0 ">
          <div
            style={{ backgroundColor: active === "add" ? "#F321" : "" }}
            className="flex items-center text-center justify-center w-full pt-3 pb-3 pl-6 pr-6"
            onClick={() => ActiveTab("add")}
          >
            <span className="text-white">Add Number</span>
          </div>
          <div
            style={{ backgroundColor: active !== "add" ? "#F321" : "" }}
            className="flex items-center text-center justify-center w-full pt-3 pb-3 pl-6 pr-6"
            onClick={() => ActiveTab("upload")}
          >
            <span className="text-white flex items-center gap-3 ">
              Upload Numbers
            </span>
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
                value={number}
                onChange={handleNumericInputChange}
              />
            </div>
          )}
          {active === "upload" && (
            <div className="flex justify-between">
              <input type="file" name="" id="" onChange={handleFileChange} />

              <div
                className="cursor-pointer bg-slate-700 text-white p-1 pl-9 pr-9 flex items-center text-center justify-center gap-3"
                onClick={() => downloadCSV()}
              >
                <img src="/download.png" alt="" style={{ width: 20 }} />
                <span>Download The Template</span>
              </div>
            </div>
          )}
        </div>

        {active !== "add" && (
          <div
            className="bg-slate-500 items-center text-center pt-1 pb-1 text-white cursor-pointer"
            onClick={() => handleUpload()}
          >
            VALIDER
          </div>
        )}

        {active === "add" && (
          <div
            className="bg-slate-500 items-center text-center pt-1 pb-1 text-white cursor-pointer"
            onClick={() => SubmitNumber()}
          >
            VALIDER
          </div>
        )}

        {showError && (
          <span className="bg-red-500 text-white  flex items-center justify-center left-0 right-0 m-auto mt-10 pt-1 pb-1">
            {error}
          </span>
        )}

        {/* {success && <span className="bg-green-500"> Number added</span>} */}
      </div>

      {listduplicate && <ListNumberDuplicate listduplicate={listduplicate} />}
    </div>
  );
}

export default CheckNumber;
