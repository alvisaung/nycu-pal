import { useEffect, useState } from "react";
import { fetchData } from "../services/dataService";

export const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    let _data = await fetchData(endpoint);
    setData(_data);
    setIsLoading(false);
  };

  const putData = async (body) => {
    try {
      await fetchData(endpoint, "put", body);
      getData();
      return "success";
    } catch (err) {
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
