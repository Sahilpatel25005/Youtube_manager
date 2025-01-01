import React from "react";

// ****************************** reusable function for api call ************************************

const apiCall = async (endpoint, method = "GET", body = null) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${baseUrl}${endpoint}`, options);

    if (!response.ok) {
      throw new Error("API call failed");
    }

    if (response.status !== 204) {
      return await response.json(); // Return JSON data if any
    }

    return null; // Handle cases where no response body is expected
  } catch (error) {
    console.error("Error in API call:", error);
    throw error; // Rethrow the error for further handling
  }
};

export default apiCall;
