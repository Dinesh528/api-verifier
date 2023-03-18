import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const ManualVerifier = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleView = () => {
    const storedResponse = sessionStorage.getItem("apiResponse");
    if (storedResponse) {
      // If response exists in sessionStorage, show it
      setApiData(JSON.parse(storedResponse));
    } else {
      // If response doesn't exist, make API call and store response in sessionStorage
      setLoading(true);
      axios
        .post(
          "http://97.74.94.225:8282/besstMainApi/df/videoSection",
          {},
          {
            headers: {
              Client_ID: "12345", // Replace with actual client ID value
            },
          }
        )
        .then((response) => {
          setLoading(false);
          sessionStorage.setItem("apiResponse", JSON.stringify(response.data));
          setApiData(response.data);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  };

  const handleClear = () => {
    sessionStorage.removeItem("apiResponse");
    setApiData(null);
  };

  return (
    <div className=" card">
      <div className="card-header">
        <h2 className="card-title text-center text-primary">Manual Verifier API</h2>
        <div className="row d-flex m-auto">
        <div className="d-grid gap-2 col-6">
          <button className="btn btn-primary " onClick={handleView}>
            View
          </button>
          </div>
          <div className="d-grid gap-2 col-6">
          <button className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
         
        </div>
        </div>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="manual-verifier__loading text-center">
            <FaSpinner className="spinner" />
            <p>Loading...</p>
          </div>
        ) : (
          <div className="manual-verifier__response">
            {apiData ? (
              <pre className="bg-light p-3">{JSON.stringify(apiData, null, 2)}</pre>
            ) : (
              <p className="text-center">No data found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualVerifier;
