import React from "react";
import axios from "axios";

/* In a real site this will be in a .env file and utils file */
const apiUrl = "http://localhost:8000";
const urlPath = "/api/robots";

export const callAPI = async () => {
  return axios
    .get(`${apiUrl}${urlPath}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};