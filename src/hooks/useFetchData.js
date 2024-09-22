"use client";
import { useEffect, useState } from "react";
import { fetchData } from "../services/dataService";

export const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async (EndPoint = endpoint) => {
    let _data = await fetchData(EndPoint);
    setData(_data);
    setIsLoading(false);
  };

  const putData = async (body, method = "put") => {
    try {
      const res = await fetchData(endpoint, method, body);
      getData();
      return res ?? "success";
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  const delData = async (body) => {
    await fetchData(endpoint, "delete", body);
    getData();
  };
  useEffect(() => {
    getData();
  }, []);
  return { data, getData, putData, isLoading, delData };
};
